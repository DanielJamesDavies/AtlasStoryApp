/**
 * Builds a nested tree from the flat `folders` and `files` arrays stored in
 * `unit.data.plot`. Each node is either a folder or a file:
 *
 *   Folder node: { ...folder, type: "folder", children: [...] }
 *   File node:   { ...file,   type: "file" }
 *
 * Folders whose parentId doesn't match any known folder are treated as root-level.
 * Files whose folderId doesn't match any known folder are treated as root-level.
 *
 * @param {Array} folders - Array of folder objects from unit.data.plot.folders
 * @param {Array} files   - Array of file objects from unit.data.plot.files
 * @returns {Array} Root-level nodes in the tree
 */
export function buildFolderTree(folders = [], files = []) {
	const folderMap = {};

	for (const folder of folders) {
		folderMap[folder._id] = { ...folder, type: "folder", children: [] };
	}

	const roots = [];

	for (const folder of folders) {
		const node = folderMap[folder._id];
		if (folder.parentId && folderMap[folder.parentId]) {
			folderMap[folder.parentId].children.push(node);
		} else {
			roots.push(node);
		}
	}

	for (const file of files) {
		const fileNode = { ...file, type: "file" };
		if (file.folderId && folderMap[file.folderId]) {
			folderMap[file.folderId].children.push(fileNode);
		} else {
			roots.push(fileNode);
		}
	}

	return roots;
}

/**
 * Returns the breadcrumb path for a given file as an array of folder names,
 * from the root down to (but not including) the file itself.
 *
 * @param {string} folderId - The folderId of the file
 * @param {Array}  folders  - Array of folder objects from unit.data.plot.folders
 * @returns {Array<{ _id: string, name: string }>} Ordered array of ancestor folders
 */
export function getFileBreadcrumbs(folderId, folders = []) {
	const breadcrumbs = [];
	let currentId = folderId;

	while (currentId) {
		const searchId = currentId;
		const folder = folders.find((f) => JSON.stringify(f._id) === JSON.stringify(searchId));
		if (!folder) break;
		breadcrumbs.unshift({ _id: folder._id, name: folder.name });
		currentId = folder.parentId || null;
	}

	return breadcrumbs;
}

/**
 * Extracts all image IDs referenced in a plot file's markdown content string.
 * Matches the standard markdown image syntax: ![alt text](mongoObjectId)
 * where mongoObjectId is a 24-character lowercase hex string.
 *
 * @param {string} content - Markdown string to scan
 * @returns {string[]} Array of image ID strings found in the content
 */
export function extractImageIDsFromContent(content) {
	if (!content || typeof content !== "string") return [];
	const matches = [...content.matchAll(/!\[.*?\]\(([a-f0-9]{24})\)/g)];
	return matches.map((match) => match[1]);
}
