const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { Readable } = require("stream");

const { checkAndIncrementClassA, checkAndIncrementClassB } = require("./r2-operation-limits");

const r2Client = new S3Client({
	region: "auto",
	endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
	credentials: {
		accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
		secretAccessKey: process.env.CLOUDFLARE_R2_ACCESS_KEY_SECRET,
	},
});

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME;

async function uploadBase64(path, base64String) {
	if (!checkAndIncrementClassA()) throw Object.assign(new Error("R2 daily write limit reached. Uploads are paused until tomorrow."), { code: "R2_LIMIT" });
	const buffer = Buffer.from(base64String, "base64");
	await r2Client.send(
		new PutObjectCommand({
			Bucket: BUCKET_NAME,
			Key: path,
			Body: buffer,
			ContentType: "image/webp",
		})
	);
	// console.log(`[R2] UPLOAD OK — ${path} (${(buffer.byteLength / 1024).toFixed(1)} KB)`);
}

async function getDownloadURL(path) {
	const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: path });
	return await getSignedUrl(r2Client, command, { expiresIn: 60 * 60 * 24 * 7 });
}

async function deleteFile(path) {
	if (!checkAndIncrementClassA()) throw Object.assign(new Error("R2 daily write limit reached. Deletes are paused until tomorrow."), { code: "R2_LIMIT" });
	await r2Client.send(new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: path }));
	// console.log(`[R2] DELETE OK — ${path}`);
}

async function getImageAsBase64(path) {
	if (!checkAndIncrementClassB()) throw Object.assign(new Error("R2 daily read limit reached. Image serving is paused until tomorrow."), { code: "R2_LIMIT" });
	const response = await r2Client.send(new GetObjectCommand({ Bucket: BUCKET_NAME, Key: path }));
	const chunks = [];
	for await (const chunk of Readable.from(response.Body)) {
		chunks.push(chunk);
	}
	const buffer = Buffer.concat(chunks);
	// console.log(`[R2] READ OK — ${path} (${(buffer.byteLength / 1024).toFixed(1)} KB)`);
	return `data:image/webp;base64,${buffer.toString("base64")}`;
}

module.exports = { r2Client, BUCKET_NAME, uploadBase64, getDownloadURL, deleteFile, getImageAsBase64 };
