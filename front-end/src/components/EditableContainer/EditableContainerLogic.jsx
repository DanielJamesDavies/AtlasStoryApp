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
	scrollItemsDepth,
	scrollItemsGap,
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

	async function getNewScrollTopViaScrollItems(new_is_editing_value) {
		if (scrollItemsDepth === undefined) return false;

		let scrollItemsDepthFrom = 0;
		let scrollItemsDepthTo = 0;
		if (typeof scrollItemsDepth === "number") {
			scrollItemsDepthFrom = scrollItemsDepth;
			scrollItemsDepthTo = scrollItemsDepth;
		} else if (typeof scrollItemsDepth === "object") {
			scrollItemsDepthFrom = new_is_editing_value ? scrollItemsDepth[0] : scrollItemsDepth[1];
			scrollItemsDepthTo = new_is_editing_value ? scrollItemsDepth[1] : scrollItemsDepth[0];
		}

		let isVerticalScrollInScrollFrom = false;
		let isVerticalScrollInScrollTo = false;

		let list_children = editableContainerRef?.current?.children?.[0]?.children?.[0];
		Array(scrollItemsDepthFrom)
			.fill(0)
			.map((_, index) => {
				list_children = list_children?.children;
				if (index + 1 < scrollItemsDepthFrom && list_children?.[0]) list_children = list_children?.[0];
				return true;
			});

		if (Array.from(list_children).length === 0 || (isVerticalScrollInScrollFrom && Array.from(list_children).length <= 2)) {
			setIsEditing(new_is_editing_value);
			return true;
		}

		const children_heights = Array.from(list_children).map((child) => {
			if (Array.from(child?.classList).includes("drag-drop-scroll-top")) {
				isVerticalScrollInScrollFrom = true;
				return 0;
			}
			return child?.clientHeight + (scrollItemsGap === undefined ? 8 : scrollItemsGap);
		});

		let list_scroll_container = editableContainerRef.current.children[0];
		Array(scrollItemsDepthFrom)
			.fill(0)
			.map(() => {
				list_scroll_container = list_scroll_container?.children[0];
				return true;
			});
		const prevScrollTop = JSON.parse(JSON.stringify(list_scroll_container?.scrollTop));

		if (isNaN(prevScrollTop) || typeof prevScrollTop !== "number") return false;
		let top_child_index = 0;
		let scrollTopRemaining = JSON.parse(JSON.stringify(prevScrollTop));
		while (scrollTopRemaining > 0 && top_child_index < children_heights.length) {
			scrollTopRemaining -= children_heights[top_child_index];
			top_child_index++;
		}

		setIsEditing(new_is_editing_value);

		await new Promise((resolve) => setTimeout(resolve, 1));

		let new_list_children = editableContainerRef.current.children[0].children[0];
		Array(scrollItemsDepthTo)
			.fill(0)
			.map((_, index) => {
				new_list_children = new_list_children?.children;
				if (index + 1 < scrollItemsDepthTo) new_list_children = new_list_children[0];
				return true;
			});

		const new_children_heights = Array.from(new_list_children).map((child) => {
			if (Array.from(child?.classList).includes("drag-drop-scroll-top")) {
				isVerticalScrollInScrollTo = true;
				return 0;
			}
			return child?.clientHeight + (scrollItemsGap === undefined ? 8 : scrollItemsGap);
		});

		if (Array.from(new_list_children).length === 0 || (isVerticalScrollInScrollTo && Array.from(new_list_children).length <= 2)) {
			setIsEditing(new_is_editing_value);
			return true;
		}

		if (isVerticalScrollInScrollFrom) top_child_index -= 1;
		if (isVerticalScrollInScrollTo) top_child_index += 1;

		let new_scroll_height = -8;
		Array(Math.min(top_child_index, Array.from(new_list_children).length - 1))
			.fill(0)
			.map((_, index) => {
				new_scroll_height += new_children_heights[index];
				return true;
			});

		new_scroll_height -= Math.abs(scrollTopRemaining);
		new_scroll_height = Math.max(new_scroll_height, 0);

		changeContentScrollTop(new_scroll_height, scrollItemsDepthTo);

		return true;
	}

	async function onEditBtnClick(e) {
		e.stopPropagation();
		try {
			const newScrollTopViaScrollItems = await getNewScrollTopViaScrollItems(true);
			if (newScrollTopViaScrollItems === false) {
				const prevScrollTop = JSON.parse(JSON.stringify(editableContainerRef.current.children[0].children[0]?.scrollTop));
				setIsEditing(true);
				setTimeout(() => changeContentScrollTop(prevScrollTop, controlScrollDepth === undefined ? 1 : controlScrollDepth[1]), 5);
			}
		} catch {
			setIsEditing(true);
		}
	}

	async function onViewBtnClick(e) {
		e.stopPropagation();
		try {
			const newScrollTopViaScrollItems = await getNewScrollTopViaScrollItems(false);
			if (newScrollTopViaScrollItems === false) {
				const prevScrollTop = JSON.parse(JSON.stringify(editableContainerRef.current?.children[0]?.children[0]?.children[0]?.scrollTop));
				setIsEditing(false);
				setTimeout(() => changeContentScrollTop(prevScrollTop, controlScrollDepth === undefined ? 1 : controlScrollDepth[0]), 5);
			}
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
