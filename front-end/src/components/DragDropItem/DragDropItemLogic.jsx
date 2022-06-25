// Packages
import { useEffect, useState } from "react";

// Components

// Logic

// Context

// Styles

// Assets

export const DragDropItemLogic = ({
	index,
	orderIndex,
	className,
	inlineItems,
	enableDragDrop,
	onDropItem,
	afterOnTouchMove,
	afterOnTouchEnd,
	currentDraggingItem,
	setCurrentDraggingItem,
	changedOrder,
	setChangedOrder,
	isUsingTouch,
	setIsUsingTouch,
}) => {
	function getDragDropItemClassName() {
		let newClassName = "drag-drop-item";
		if (inlineItems) newClassName += " drag-drop-item-inline";
		if (enableDragDrop) newClassName += " drag-drop-item-enable-drag-drop";
		if (currentDraggingItem !== undefined && currentDraggingItem === orderIndex) newClassName += " drag-drop-item-dragging";
		if (currentDraggingItem !== undefined && currentDraggingItem === orderIndex && isUsingTouch)
			newClassName += " drag-drop-item-dragging-touch";
		if (!className) return newClassName;
		return (newClassName += " " + className);
	}
	const [dragDropItemClassName, setDragDropItemClassName] = useState(getDragDropItemClassName());
	useEffect(() => {
		function getDragDropItemClassName() {
			let newClassName = "drag-drop-item";
			if (inlineItems) newClassName += " drag-drop-item-inline";
			if (enableDragDrop) newClassName += " drag-drop-item-enable-drag-drop";
			if (currentDraggingItem !== undefined && currentDraggingItem === orderIndex) newClassName += " drag-drop-item-dragging";
			if (currentDraggingItem !== undefined && currentDraggingItem === orderIndex && isUsingTouch)
				newClassName += " drag-drop-item-dragging-touch";
			if (!className) return newClassName;
			return (newClassName += " " + className);
		}
		setDragDropItemClassName(getDragDropItemClassName());
	}, [setDragDropItemClassName, orderIndex, className, inlineItems, enableDragDrop, currentDraggingItem, isUsingTouch]);

	function onDragStart(e) {
		e.stopPropagation();
		if (!enableDragDrop) return;

		setIsUsingTouch(false);

		let dragKey = false;
		let attempts = 20;
		while (dragKey === false && attempts > 0) {
			attempts--;
			if (!e.target.classList || !Array.from(e.target.classList).includes("drag-drop-item")) {
				e.target = e.target.parentNode;
				continue;
			}
			dragKey = parseInt(e.target.getAttribute("drag-key"));
		}
		if (dragKey === false) return;

		setCurrentDraggingItem(dragKey);
	}

	function onDragEnd(e) {
		e.stopPropagation();
		if (!enableDragDrop) return;
		setCurrentDraggingItem(null);
		onDropItem(currentDraggingItem === null ? {} : JSON.parse(JSON.stringify(changedOrder)));
		setChangedOrder(null);
		setIsUsingTouch(false);
	}

	function onDragEnter() {
		if (!enableDragDrop || currentDraggingItem === null) return;
		setChangedOrder({ from: currentDraggingItem, to: index });
		setIsUsingTouch(false);
	}

	function onTouchStart(e) {
		e.stopPropagation();
		if (!enableDragDrop) return;
		setIsUsingTouch(true);

		let dragKey = false;
		let attempts = 20;
		while (dragKey === false && attempts > 0) {
			attempts--;
			if (!e.target.classList || !Array.from(e.target.classList).includes("drag-drop-item")) {
				e.target = e.target.parentNode;
				continue;
			}
			dragKey = parseInt(e.target.getAttribute("drag-key"));
		}
		if (dragKey === false) return;

		setCurrentDraggingItem(dragKey);
	}

	function onTouchEnd() {
		if (!enableDragDrop || currentDraggingItem === null) return;
		setCurrentDraggingItem(null);
		onDropItem(currentDraggingItem === null ? {} : JSON.parse(JSON.stringify(changedOrder)));
		setChangedOrder(null);
		if (afterOnTouchEnd) afterOnTouchEnd();
	}

	function onTouchMove(e) {
		if (!enableDragDrop || currentDraggingItem === null) return;
		setIsUsingTouch(true);

		if (e?.touches[0]?.clientX === undefined || e?.touches[0]?.clientY === undefined) return;
		const elementsOver = document.elementsFromPoint(e.touches[0].clientX, e.touches[0].clientY);
		let dragKey = false;
		elementsOver.forEach((element) => {
			if (
				dragKey === false &&
				element?.classList &&
				Array.from(element?.classList).includes("drag-drop-item") &&
				element?.getAttribute("drag-key")
			) {
				dragKey = element?.getAttribute("drag-key");
			}
		});
		if (dragKey !== false) setChangedOrder({ from: currentDraggingItem, to: dragKey });

		if (afterOnTouchMove) afterOnTouchMove(e);
	}

	return { dragDropItemClassName, onDragStart, onDragEnd, onDragEnter, onTouchStart, onTouchEnd, onTouchMove };
};
