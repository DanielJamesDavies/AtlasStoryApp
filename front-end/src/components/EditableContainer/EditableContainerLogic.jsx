// Packages
import { useEffect, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const EditableContainerLogic = ({ className, onRevert, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);

	// Editable Container Class Name
	const [editableContainerClassName, setEditableContainerClassName] = useState("editable-container");

	useEffect(() => {
		function getEditableContainerClassName() {
			let newClassName = "editable-container";
			if (isEditing) newClassName += " editable-container-is-editing";
			if (className) newClassName += " " + className;
			return newClassName;
		}
		setEditableContainerClassName(getEditableContainerClassName());
	}, [setEditableContainerClassName, isEditing, className]);

	// Button Event Functions
	function onEditBtnClick() {
		setIsEditing(true);
	}

	function onViewBtnClick() {
		setIsEditing(false);
	}

	async function onRevertBtnClick() {
		const revert_success = await onRevert();
		if (revert_success) setIsEditing(false);
	}

	async function onSaveBtnClick() {
		const save_success = await onSave();
		if (save_success) setIsEditing(false);
	}

	return { isEditing, setIsEditing, editableContainerClassName, onEditBtnClick, onViewBtnClick, onRevertBtnClick, onSaveBtnClick };
};
