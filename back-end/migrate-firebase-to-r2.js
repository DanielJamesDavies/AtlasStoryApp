/**
 * One-time migration script: copies all images from Firebase Storage to Cloudflare R2
 * and updates file_size_bytes on each MongoDB Image record.
 *
 * Run from the back-end directory:
 *   node migrate-firebase-to-r2.js
 *
 * The script is idempotent — files already present in R2 are skipped.
 * Re-run safely if it fails partway through.
 */

require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const axios = require("axios");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, listAll, getDownloadURL } = require("firebase/storage");
const { S3Client, PutObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");

const Image = require("./models/Image");

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const r2Client = new S3Client({
	region: "auto",
	endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
	credentials: {
		accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
		secretAccessKey: process.env.CLOUDFLARE_R2_ACCESS_KEY_SECRET,
	},
});

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME;

async function fileExistsInR2(key) {
	try {
		await r2Client.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
		return true;
	} catch {
		return false;
	}
}

async function migrate() {
	await mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true });
	console.log("Connected to MongoDB");

	const firebaseApp = initializeApp(firebaseConfig);
	const storage = getStorage(firebaseApp);

	console.log("Listing files in Firebase Storage...");
	const listResult = await listAll(ref(storage, "images"));
	const total = listResult.items.length;
	console.log(`Found ${total} files\n`);

	let migrated = 0;
	let skipped = 0;
	let failed = 0;

	for (let i = 0; i < listResult.items.length; i++) {
		const itemRef = listResult.items[i];
		const key = itemRef.fullPath;
		const imageId = itemRef.name.replace(".webp", "");
		const num = `[${i + 1}/${total}]`;

		try {
			if (await fileExistsInR2(key)) {
				skipped++;
				console.log(`${num} SKIP  ${itemRef.name} (already in R2)`);
				continue;
			}

			const downloadUrl = await getDownloadURL(itemRef);
			const { data } = await axios.get(downloadUrl, { responseType: "arraybuffer" });
			const buffer = Buffer.from(data);

			await r2Client.send(
				new PutObjectCommand({
					Bucket: BUCKET_NAME,
					Key: key,
					Body: buffer,
					ContentType: "image/webp",
				})
			);

			await Image.updateOne({ _id: new mongoose.Types.ObjectId(imageId) }, { $set: { file_size_bytes: buffer.byteLength } });

			migrated++;
			console.log(`${num} OK    ${itemRef.name} (${(buffer.byteLength / 1024).toFixed(1)} KB)`);
		} catch (error) {
			failed++;
			console.error(`${num} FAIL  ${itemRef.name} — ${error.message}`);
		}
	}

	console.log("\n--- Migration complete ---");
	console.log(`  Migrated : ${migrated}`);
	console.log(`  Skipped  : ${skipped} (already in R2)`);
	console.log(`  Failed   : ${failed}`);
	console.log(`  Total    : ${total}`);

	if (failed > 0) console.log("\nRe-run the script to retry failed files.");

	await mongoose.disconnect();
	process.exit(0);
}

migrate().catch((e) => {
	console.error("Migration failed:", e);
	process.exit(1);
});
