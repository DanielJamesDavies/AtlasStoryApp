/**
 * Extracts all image IDs referenced in a plot file's markdown content.
 * Matches the standard markdown image syntax: ![alt text](mongoObjectId)
 * where mongoObjectId is a 24-character hex string.
 *
 * @param {string} content - Markdown string to scan
 * @returns {string[]} Array of image ID strings found in the content
 */
function extractPlotFileImageIDs(content) {
	if (!content || typeof content !== "string") return [];
	const matches = [...content.matchAll(/!\[.*?\]\(([a-f0-9]{24})\)/g)];
	return matches.map((match) => match[1]);
}

module.exports = extractPlotFileImageIDs;
