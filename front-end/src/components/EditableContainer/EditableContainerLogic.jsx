// Packages
import { useRef } from "react";
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
	absolutePositionEditBtns,
	isAuthorizedToEdit,
	onClose,
	onHide,
	onAdd,
	onRemove,
	onDefault,
	onSaveDefault,
	onReorder,
	onCopyVersionValue,
	onPasteVersionValue,
	onRevert,
	onSave,
	onScroll,
	isLight,
	higherEditBtns,
	controlScrollDepth,
}) => {
	const [isEditing, setIsEditing] = useState(false);

	const editableContainerRef = useRef();
	useEffect(() => {
		const editableContainerRefCurrent = editableContainerRef?.current;
		if (onScroll) editableContainerRefCurrent?.addEventListener("wheel", onScroll);
		return () => {
			if (onScroll) editableContainerRefCurrent?.removeEventListener("wheel", onScroll);
		};
	}, [editableContainerRef, onScroll]);

	// Editable Container Class Name
	const [editableContainerClassName, setEditableContainerClassName] = useState(
		className
			? "editable-container editable-container-absolute-position-edit-btns " + className
			: "editable-container editable-container-absolute-position-edit-btns"
	);

	useEffect(() => {
		function getEditableContainerClassName() {
			let newClassName = "editable-container";
			if (isEditing) newClassName += " editable-container-is-editing";
			if (isAuthorizedToEdit) newClassName += " editable-container-is-authorized";
			if (isMediaContent) newClassName += " editable-container-media";
			if (absolutePositionEditBtns) newClassName += " editable-container-absolute-position-edit-btns";
			if (isLight) newClassName += " editable-container-light";
			if (higherEditBtns) newClassName += " editable-container-higher-edit-btns";
			if (className) newClassName += " " + className;
			return newClassName;
		}
		setEditableContainerClassName(getEditableContainerClassName());
	}, [
		setEditableContainerClassName,
		isEditing,
		isAuthorizedToEdit,
		absolutePositionEditBtns,
		isMediaContent,
		className,
		isLight,
		higherEditBtns,
	]);

	async function onEditableContainerKeyDown(e) {
		if (e?.ctrlKey && (e?.key === "s" || e?.key === "S")) {
			e.preventDefault();
			const save_success = await onSave();
			if (save_success) setIsEditing(false);
		}
	}

	// Button Event Functions
	async function onCloseBtnClick(e) {
		e.stopPropagation();
		await onClose();
	}

	function changeContentScrollTop(scrollTop, depth) {
		switch (depth) {
			case 0:
				editableContainerRef.current.children[0].scrollTop = scrollTop;
				break;
			case 1:
				editableContainerRef.current.children[0].children[0].scrollTop = scrollTop;
				break;
			case 2:
				editableContainerRef.current.children[0].children[0].children[0].scrollTop = scrollTop;
				break;
			default:
				editableContainerRef.current.children[0].children[0].scrollTop = scrollTop;
		}
	}

	function onEditBtnClick(e) {
		e.stopPropagation();
		try {
			const prevScrollTop = JSON.parse(JSON.stringify(editableContainerRef.current.children[0].children[0]?.scrollTop));
			setIsEditing(true);
			setTimeout(() => changeContentScrollTop(prevScrollTop, controlScrollDepth === undefined ? 1 : controlScrollDepth[1]), 5);
		} catch {
			setIsEditing(true);
		}
	}

	function onViewBtnClick(e) {
		e.stopPropagation();
		try {
			const prevScrollTop = JSON.parse(JSON.stringify(editableContainerRef.current?.children[0]?.children[0]?.children[0]?.scrollTop));
			setIsEditing(false);
			setTimeout(() => changeContentScrollTop(prevScrollTop, controlScrollDepth === undefined ? 1 : controlScrollDepth[0]), 5);
		} catch {
			setIsEditing(false);
		}
	}

	async function onHideBtnClick(e) {
		e.stopPropagation();
		const success = await onHide();
		if (success) setIsEditing(false);
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

	async function onSaveDefaultBtnClick(e) {
		e.stopPropagation();
		const save_default_success = await onSaveDefault();
		if (save_default_success) setIsEditing(false);
	}

	async function onCopyVersionValueBtnClick(e) {
		e.stopPropagation();
		await onCopyVersionValue();
	}

	async function onPasteVersionValueBtnClick(e) {
		e.stopPropagation();
		await onPasteVersionValue();
	}

	async function onReorderBtnClick(e) {
		e.stopPropagation();
		await onReorder();
	}

	async function onRevertBtnClick(e) {
		e.stopPropagation();
		const revert_success = await onRevert(e);
		if (revert_success) setIsEditing(false);
	}

	async function onSaveBtnClick(e) {
		e.stopPropagation();
		const save_success = await onSave(e);
		if (save_success) setIsEditing(false);
	}

	return {
		isEditing,
		setIsEditing,
		editableContainerRef,
		editableContainerClassName,
		onEditableContainerKeyDown,
		onCloseBtnClick,
		onEditBtnClick,
		onViewBtnClick,
		onHideBtnClick,
		onAddBtnClick,
		onRemoveBtnClick,
		onDefaultBtnClick,
		onSaveDefaultBtnClick,
		onReorderBtnClick,
		onCopyVersionValueBtnClick,
		onPasteVersionValueBtnClick,
		onRevertBtnClick,
		onSaveBtnClick,
	};
};
