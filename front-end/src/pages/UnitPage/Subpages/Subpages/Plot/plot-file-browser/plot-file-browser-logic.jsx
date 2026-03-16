// Packages
import { useState, useMemo, useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const PlotFileBrowserLogic = ({ onSelectFile }) => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	const folders = useMemo(() => unit?.data?.plot?.folders || [], [unit]);
	const files = useMemo(() => unit?.data?.plot?.files || [], [unit]);

	// ── Navigation ──────────────────────────────────────────────────────────────
	const [currentFolderID, setCurrentFolderID] = useState(null); // null = root
	const [historyStack, setHistoryStack] = useState([]);
	const [forwardStack, setForwardStack] = useState([]);

	function navigateTo(id) {
		setHistoryStack((prev) => [...prev, currentFolderID]);
		setForwardStack([]);
		setCurrentFolderID(id);
		clearTransientState();
	}

	function navigateBack() {
		if (historyStack.length === 0) return;
		const prev = historyStack[historyStack.length - 1];
		setHistoryStack((s) => s.slice(0, -1));
		setForwardStack((s) => [currentFolderID, ...s]);
		setCurrentFolderID(prev);
		clearTransientState();
	}

	function navigateForward() {
		if (forwardStack.length === 0) return;
		const next = forwardStack[0];
		setForwardStack((s) => s.slice(1));
		setHistoryStack((s) => [...s, currentFolderID]);
		setCurrentFolderID(next);
		clearTransientState();
	}

	function clearTransientState() {
		setRenamingID(null);
		setRenamingValue("");
		setConfirmingDeleteID(null);
		setIsCreatingFolder(false);
		setNewFolderName("");
		setIsCreatingFile(false);
		setNewFileName("");
	}

	// Breadcrumb path for the current folder
	const currentPath = useMemo(() => {
		const crumbs = [];
		let id = currentFolderID;
		while (id) {
			const folder = folders.find((f) => JSON.stringify(f._id) === JSON.stringify(id));
			if (!folder) break;
			crumbs.unshift({ _id: folder._id, name: folder.name });
			id = folder.parentId || null;
		}
		return crumbs;
	}, [currentFolderID, folders]);

	const visibleFolders = useMemo(
		() => folders.filter((f) => JSON.stringify(f.parentId ?? null) === JSON.stringify(currentFolderID)),
		[folders, currentFolderID]
	);

	const visibleFiles = useMemo(
		() => files.filter((f) => JSON.stringify(f.folderId ?? null) === JSON.stringify(currentFolderID)),
		[files, currentFolderID]
	);

	// ── Rename ───────────────────────────────────────────────────────────────────
	const [renamingID, setRenamingID] = useState(null);
	const [renamingValue, setRenamingValue] = useState("");

	function startRename(id, currentName) {
		setRenamingID(id);
		setRenamingValue(currentName);
		setConfirmingDeleteID(null);
	}

	function cancelRename() {
		setRenamingID(null);
		setRenamingValue("");
	}

	// ── Delete confirmation ───────────────────────────────────────────────────────
	const [confirmingDeleteID, setConfirmingDeleteID] = useState(null);

	function startDelete(id) {
		setConfirmingDeleteID(id);
		setRenamingID(null);
	}

	function cancelDelete() {
		setConfirmingDeleteID(null);
	}

	// ── Create folder ─────────────────────────────────────────────────────────────
	const [isCreatingFolder, setIsCreatingFolder] = useState(false);
	const [newFolderName, setNewFolderName] = useState("");

	function startCreateFolder() {
		setIsCreatingFolder(true);
		setNewFolderName("");
		setIsCreatingFile(false);
	}

	function cancelCreateFolder() {
		setIsCreatingFolder(false);
		setNewFolderName("");
	}

	// ── Create file ───────────────────────────────────────────────────────────────
	const [isCreatingFile, setIsCreatingFile] = useState(false);
	const [newFileName, setNewFileName] = useState("");

	function startCreateFile() {
		setIsCreatingFile(true);
		setNewFileName("");
		setIsCreatingFolder(false);
	}

	function cancelCreateFile() {
		setIsCreatingFile(false);
		setNewFileName("");
	}

	// ── CRUD: Folders ─────────────────────────────────────────────────────────────

	async function createFolder() {
		if (!isAuthorizedToEdit) return;
		const name = newFolderName.trim() || "New Folder";
		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response?.data?._id) return;

		const newFolder = { _id: new_id_response.data._id, name, parentId: currentFolderID || null };

		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.plot.folders.push(newFolder);
		setUnit(newUnit);
		cancelCreateFolder();

		await APIRequest(`/${unit_type}/${unit._id}`, "PATCH", {
			story_id: story._id,
			path: ["data", "plot", "folders"],
			task: "add",
			newValue: newFolder,
		});
	}

	async function renameFolder(folderId) {
		if (!isAuthorizedToEdit) return;
		const name = renamingValue.trim();
		if (!name) return cancelRename();

		const folderIndex = unit.data.plot.folders.findIndex((f) => JSON.stringify(f._id) === JSON.stringify(folderId));
		if (folderIndex === -1) return cancelRename();

		const newFolder = { ...unit.data.plot.folders[folderIndex], name };
		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.plot.folders[folderIndex] = newFolder;
		setUnit(newUnit);
		cancelRename();

		await APIRequest(`/${unit_type}/${unit._id}`, "PATCH", {
			story_id: story._id,
			path: ["data", "plot", "folders"],
			task: "update",
			item_id: folderId,
			newValue: newFolder,
		});
	}

	async function deleteFolder(folderId) {
		if (!isAuthorizedToEdit) return;
		const descendantIDs = getDescendantFolderIDs(unit.data.plot.folders, folderId);

		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.plot.folders = newUnit.data.plot.folders.filter(
			(f) => !descendantIDs.some((id) => JSON.stringify(id) === JSON.stringify(f._id))
		);
		newUnit.data.plot.files = newUnit.data.plot.files.filter(
			(f) => !descendantIDs.some((id) => JSON.stringify(id) === JSON.stringify(f.folderId))
		);
		setUnit(newUnit);
		cancelDelete();

		// If we're inside the deleted folder, go back
		if (descendantIDs.some((id) => JSON.stringify(id) === JSON.stringify(currentFolderID))) {
			navigateBack();
		}

		await APIRequest(`/${unit_type}/${unit._id}`, "PATCH", {
			story_id: story._id,
			path: ["data", "plot", "folders"],
			task: "remove",
			remove_id: folderId,
		});
	}

	async function moveFolder(folderId, newParentId) {
		if (!isAuthorizedToEdit) return;
		const folderIndex = unit.data.plot.folders.findIndex((f) => JSON.stringify(f._id) === JSON.stringify(folderId));
		if (folderIndex === -1) return;

		const newFolder = { ...unit.data.plot.folders[folderIndex], parentId: newParentId || null };
		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.plot.folders[folderIndex] = newFolder;
		setUnit(newUnit);

		await APIRequest(`/${unit_type}/${unit._id}`, "PATCH", {
			story_id: story._id,
			path: ["data", "plot", "folders"],
			task: "update",
			item_id: folderId,
			newValue: newFolder,
		});
	}

	// ── CRUD: Files ───────────────────────────────────────────────────────────────

	async function createFile() {
		if (!isAuthorizedToEdit) return;
		const name = newFileName.trim() || "New File";
		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response?.data?._id) return;

		const newFile = { _id: new_id_response.data._id, name, folderId: currentFolderID || null, content: "" };

		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.plot.files.push(newFile);
		setUnit(newUnit);
		cancelCreateFile();
		onSelectFile(new_id_response.data._id);

		await APIRequest(`/${unit_type}/${unit._id}`, "PATCH", {
			story_id: story._id,
			path: ["data", "plot", "files"],
			task: "add",
			newValue: newFile,
		});
	}

	async function renameFile(fileId) {
		if (!isAuthorizedToEdit) return;
		const name = renamingValue.trim();
		if (!name) return cancelRename();

		const fileIndex = unit.data.plot.files.findIndex((f) => JSON.stringify(f._id) === JSON.stringify(fileId));
		if (fileIndex === -1) return cancelRename();

		const newFile = { ...unit.data.plot.files[fileIndex], name };
		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.plot.files[fileIndex] = newFile;
		setUnit(newUnit);
		cancelRename();

		await APIRequest(`/${unit_type}/${unit._id}`, "PATCH", {
			story_id: story._id,
			path: ["data", "plot", "files"],
			task: "update",
			item_id: fileId,
			newValue: newFile,
		});
	}

	async function deleteFile(fileId) {
		if (!isAuthorizedToEdit) return;
		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.plot.files = newUnit.data.plot.files.filter((f) => JSON.stringify(f._id) !== JSON.stringify(fileId));
		setUnit(newUnit);
		cancelDelete();

		await APIRequest(`/${unit_type}/${unit._id}`, "PATCH", {
			story_id: story._id,
			path: ["data", "plot", "files"],
			task: "remove",
			remove_id: fileId,
		});
	}

	async function moveFile(fileId, newFolderId) {
		if (!isAuthorizedToEdit) return;
		const fileIndex = unit.data.plot.files.findIndex((f) => JSON.stringify(f._id) === JSON.stringify(fileId));
		if (fileIndex === -1) return;

		const newFile = { ...unit.data.plot.files[fileIndex], folderId: newFolderId || null };
		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.plot.files[fileIndex] = newFile;
		setUnit(newUnit);

		await APIRequest(`/${unit_type}/${unit._id}`, "PATCH", {
			story_id: story._id,
			path: ["data", "plot", "files"],
			task: "update",
			item_id: fileId,
			newValue: newFile,
		});
	}

	return {
		isAuthorizedToEdit,
		folders,
		files,
		// Navigation
		currentFolderID,
		currentPath,
		historyStack,
		forwardStack,
		navigateTo,
		navigateBack,
		navigateForward,
		visibleFolders,
		visibleFiles,
		// Rename
		renamingID,
		renamingValue,
		setRenamingValue,
		startRename,
		cancelRename,
		renameFolder,
		renameFile,
		// Delete
		confirmingDeleteID,
		startDelete,
		cancelDelete,
		deleteFolder,
		deleteFile,
		// Move (drag-and-drop)
		moveFolder,
		moveFile,
		// Create folder
		isCreatingFolder,
		newFolderName,
		setNewFolderName,
		startCreateFolder,
		cancelCreateFolder,
		createFolder,
		// Create file
		isCreatingFile,
		newFileName,
		setNewFileName,
		startCreateFile,
		cancelCreateFile,
		createFile,
	};
};

function getDescendantFolderIDs(folders, rootID) {
	const ids = [rootID];
	const queue = [rootID];
	while (queue.length > 0) {
		const current = queue.shift();
		folders
			.filter((f) => JSON.stringify(f.parentId) === JSON.stringify(current))
			.forEach((child) => {
				ids.push(child._id);
				queue.push(child._id);
			});
	}
	return ids;
}
