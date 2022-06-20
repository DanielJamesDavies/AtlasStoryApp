// Packages
import { useEffect, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const EditableContainerLogic = ({
	className,
	isMediaContent,
	isAuthorizedToEdit,
	onClose,
	onAdd,
	onRemove,
	onDefault,
	onReorder,
	onRevert,
	onSave,
}) => {
	const [isEditing, setIsEditing] = useState(false);

	// Editable Container Class Name
	const [editableContainerClassName, setEditableContainerClassName] = useState("editable-container");

	useEffect(() => {
		function getEditableContainerClassName() {
			let newClassName = "editable-container";
			if (isEditing) newClassName += " editable-container-is-editing";
			if (isAuthorizedToEdit) newClassName += " editable-container-is-authorized";
			if (isMediaContent) newClassName += " editable-container-media";
			if (className) newClassName += " " + className;
			return newClassName;
		}
		setEditableContainerClassName(getEditableContainerClassName());
	}, [setEditableContainerClassName, isEditing, isMediaContent, isAuthorizedToEdit, className]);

	// Button Event Functions
	async function onCloseBtnClick(e) {
		e.stopPropagation();
		await onClose();
	}

	function onEditBtnClick(e) {
		e.stopPropagation();
		setIsEditing(true);
	}

	function onViewBtnClick(e) {
		e.stopPropagation();
		setIsEditing(false);
	}

	async function onAddBtnClick(e) {
		e.stopPropagation();
		const add_success = await onAdd();
		if (add_success) setIsEditing(false);
	}

	async function onRemoveBtnClick(e) {
		e.stopPropagation();
		const remove_success = await onRemove();
		if (remove_success) setIsEditing(false);
	}

	async function onDefaultBtnClick(e) {
		e.stopPropagation();
		const default_success = await onDefault();
		if (default_success) setIsEditing(false);
	}

	async function onReorderBtnClick(e) {
		e.stopPropagation();
		const reorder_success = await onReorder();
		if (reorder_success) setIsEditing(false);
	}

	async function onRevertBtnClick(e) {
		e.stopPropagation();
		const revert_success = await onRevert();
		if (revert_success) setIsEditing(false);
	}

	async function onSaveBtnClick(e) {
		e.stopPropagation();
		const save_success = await onSave();
		if (save_success) setIsEditing(false);
	}

	return {
		isEditing,
		setIsEditing,
		editableContainerClassName,
		onCloseBtnClick,
		onEditBtnClick,
		onViewBtnClick,
		onAddBtnClick,
		onRemoveBtnClick,
		onDefaultBtnClick,
		onReorderBtnClick,
		onRevertBtnClick,
		onSaveBtnClick,
	};
};
