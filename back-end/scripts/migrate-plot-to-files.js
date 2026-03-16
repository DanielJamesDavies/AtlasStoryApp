/**
 * One-time migration: converts the old plot structure (clusters → groups → items)
 * to the new file-system structure (folders → files with markdown content).
 *
 * Mapping:
 *   cluster  → top-level folder  (parentId: null)
 *   group    → subfolder         (parentId: cluster folder _id)
 *   item     → file              (folderId: group folder _id)
 *             item.label       → file.name
 *             item.text[]      → file.content  (paragraphs joined with \n\n)
 *             item.images[]    → appended to content as ![caption](imageId)
 *
 * Items that exist in `plot.items` but are not referenced by any group are placed
 * at the root level (folderId: null).
 *
 * Safe to re-run: substories that already have plot.files are skipped.
 *
 * Usage (from the back-end directory):
 *   node scripts/migrate-plot-to-files.js
 */

const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const Substory = require("../models/Substory");

async function migrate() {
	await mongoose.connect(process.env.URI);
	console.log("Connected to MongoDB");

	const substories = await Substory.find({}).lean().exec();
	console.log(`Found ${substories.length} substories to check\n`);

	let migrated = 0;
	let skipped = 0;

	for (const substory of substories) {
		if (substory.data?.plot?.files?.length > 0) {
			console.log(`Skip  ${substory._id} — already has ${substory.data.plot.files.length} file(s)`);
			skipped++;
			continue;
		}

		const clusters = substory.data?.plot?.clusters || [];
		const items = substory.data?.plot?.items || [];

		const folders = [];
		const files = [];

		// Track which item IDs have been placed into a group file
		const groupedItemIDs = new Set();

		for (const cluster of clusters) {
			// Skip the virtual "All" cluster — it contains no unique organisational info
			if (cluster.isAll) continue;

			const clusterFolderID = new mongoose.Types.ObjectId();
			folders.push({
				_id: clusterFolderID,
				name: cluster.name || "Untitled Folder",
				parentId: null,
			});

			for (const group of cluster.groups || []) {
				const groupFolderID = new mongoose.Types.ObjectId();
				folders.push({
					_id: groupFolderID,
					name: group.name || "Untitled Folder",
					parentId: clusterFolderID,
				});

				for (const itemID of group.items || []) {
					const item = items.find((i) => JSON.stringify(i._id) === JSON.stringify(itemID));
					if (!item) continue;

					groupedItemIDs.add(JSON.stringify(itemID));

					files.push({
						_id: new mongoose.Types.ObjectId(),
						name: item.label || "Untitled",
						folderId: groupFolderID,
						content: buildMarkdownContent(item),
					});
				}
			}
		}

		// Items not referenced by any group land at the root level
		const ungrouped = items.filter((item) => !groupedItemIDs.has(JSON.stringify(item._id)));
		for (const item of ungrouped) {
			files.push({
				_id: new mongoose.Types.ObjectId(),
				name: item.label || "Untitled",
				folderId: null,
				content: buildMarkdownContent(item),
			});
		}

		try {
			await Substory.findOneAndUpdate(
				{ _id: substory._id },
				{ $set: { "data.plot.folders": folders, "data.plot.files": files } }
			);
			console.log(`Done  ${substory._id} — ${files.length} file(s), ${folders.length} folder(s)`);
			migrated++;
		} catch (e) {
			console.error(`Error ${substory._id}:`, e.message);
		}
	}

	console.log(`\nMigration complete: ${migrated} migrated, ${skipped} skipped`);
	await mongoose.disconnect();
}

/**
 * Converts a legacy plot item into a markdown string.
 * Text paragraphs come first, then each image as ![caption](id).
 */
function buildMarkdownContent(item) {
	const paragraphs = (item.text || []).filter(Boolean).join("\n\n");
	const imageLines = (item.images || [])
		.map((img) => `![${img.caption || ""}](${img.image})`)
		.join("\n\n");

	return [paragraphs, imageLines].filter(Boolean).join("\n\n");
}

migrate().catch((e) => {
	console.error("Migration failed:", e);
	process.exit(1);
});
