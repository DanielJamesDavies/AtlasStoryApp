// Packages
import { useContext, useState, useEffect, useMemo, useCallback } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../UnitPageContext";
import { APIContext } from "../../../../../context/APIContext";

// Services

// Assets

export const PlotLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	// ── File selection ────────────────────────────────────────────────────────────
	const [currentFileID, setCurrentFileID] = useState(null);
	const [isFileBrowserOpen, setIsFileBrowserOpen] = useState(false);

	// Auto-select the initial file (or first file) when the unit loads
	useEffect(() => {
		if (currentFileID) return;
		const files = unit?.data?.plot?.files;
		if (!files?.length) return;
		const initialID = unit?.data?.plot?.initialFileID;
		const preferred = initialID && files.find((f) => JSON.stringify(f._id) === JSON.stringify(initialID));
		setCurrentFileID(preferred ? preferred._id : files[0]._id);
	}, [unit, currentFileID]);

	const currentFile = useMemo(() => {
		if (!currentFileID || !unit?.data?.plot?.files) return null;
		return unit.data.plot.files.find((f) => JSON.stringify(f._id) === JSON.stringify(currentFileID)) || null;
	}, [currentFileID, unit]);

	function openFileBrowser() {
		setIsFileBrowserOpen(true);
	}

	function closeFileBrowser() {
		setIsFileBrowserOpen(false);
	}

	function selectFile(fileID) {
		setCurrentFileID(fileID);
		closeFileBrowser();
	}

	const initialFileID = unit?.data?.plot?.initialFileID ?? null;

	const setInitialFile = useCallback(async () => {
		if (!isAuthorizedToEdit || !currentFileID) return;
		const newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.plot.initialFileID = currentFileID;
		setUnit(newUnit);
		await APIRequest(`/${unit_type}/${unit._id}`, "PATCH", {
			story_id: story._id,
			path: ["data", "plot", "initialFileID"],
			newValue: currentFileID,
		});
	}, [isAuthorizedToEdit, currentFileID, unit, setUnit, unit_type, story, APIRequest]);

	// ── Edit mode ─────────────────────────────────────────────────────────────────
	const [isEditing, setIsEditing] = useState(false);

	// Exit edit mode whenever the active file changes
	useEffect(() => {
		setIsEditing(false);
	}, [currentFileID]);

	function enterEditMode() {
		if (isAuthorizedToEdit && currentFile) setIsEditing(true);
	}

	function revertFile() {
		setIsEditing(false);
	}

	const saveFile = useCallback(
		async (newContent, newName) => {
			if (!isAuthorizedToEdit || !currentFile) return;

			const fileIndex = unit.data.plot.files.findIndex((f) => JSON.stringify(f._id) === JSON.stringify(currentFile._id));
			if (fileIndex === -1) return;

			const updatedFile = {
				...unit.data.plot.files[fileIndex],
				content: newContent,
				name: newName ?? unit.data.plot.files[fileIndex].name,
			};

			// Optimistic update
			const newUnit = JSON.parse(JSON.stringify(unit));
			newUnit.data.plot.files[fileIndex] = updatedFile;
			setUnit(newUnit);
			setIsEditing(false);

			await APIRequest(`/${unit_type}/${unit._id}`, "PATCH", {
				story_id: story._id,
				path: ["data", "plot", "files"],
				task: "update",
				item_id: currentFile._id,
				newValue: updatedFile,
			});
		},
		[isAuthorizedToEdit, currentFile, unit, setUnit, unit_type, story, APIRequest]
	);

	return {
		unit,
		currentFileID,
		currentFile,
		initialFileID,
		setInitialFile,
		isFileBrowserOpen,
		openFileBrowser,
		closeFileBrowser,
		selectFile,
		isEditing,
		isAuthorizedToEdit,
		enterEditMode,
		saveFile,
		revertFile,
	};
};
