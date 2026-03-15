const Image = require("../../models/Image");

// 9.7 GB in bytes — stays safely under Cloudflare R2's 10 GB free tier
const STORAGE_LIMIT_BYTES = 9_700_000_000;

/**
 * Returns the decoded byte size of a base64 string (with data URI prefix already stripped).
 */
function getBase64SizeBytes(base64String) {
	return Buffer.byteLength(base64String, "base64");
}

/**
 * Checks whether adding `newSizeBytes` (minus `existingSizeBytes` for replacements)
 * would exceed the global storage cap.
 * Returns { exceeded: boolean, currentUsage, projectedUsage, limit }.
 */
async function checkStorageQuota(newSizeBytes, existingSizeBytes = 0) {
	const result = await Image.aggregate([{ $group: { _id: null, total: { $sum: "$file_size_bytes" } } }]);
	const currentUsage = result[0]?.total || 0;
	const projectedUsage = currentUsage - existingSizeBytes + newSizeBytes;
	return {
		exceeded: projectedUsage > STORAGE_LIMIT_BYTES,
		currentUsage,
		projectedUsage,
		limit: STORAGE_LIMIT_BYTES,
	};
}

module.exports = { checkStorageQuota, getBase64SizeBytes, STORAGE_LIMIT_BYTES };
