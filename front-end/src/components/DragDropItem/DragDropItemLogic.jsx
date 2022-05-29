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
	currentDraggingItem,
	setCurrentDraggingItem,
	changedOrder,
	setChangedOrder,
}) => {
	const [dragDropItemClassName, setDragDropItemClassName] = useState("drag-drop-item");

	useEffect(() => {
		function getDragDropItemClassName() {
			let newClassName = "drag-drop-item";
			if (inlineItems) newClassName += " drag-drop-item-inline";
			if (enableDragDrop) newClassName += " drag-drop-item-enable-drag-drop";
			if (currentDraggingItem === orderIndex) newClassName += " drag-drop-item-dragging";
			if (!className) return newClassName;
			return (newClassName += " " + className);
		}

		setDragDropItemClassName(getDragDropItemClassName());
	}, [setDragDropItemClassName, orderIndex, className, inlineItems, enableDragDrop, currentDraggingItem]);

	function onDragStart(e) {
		let foundDragKey = false;
		while (!foundDragKey) {
			if (!e.target.classList || !Array.from(e.target.classList).includes("drag-drop-item")) {
				e.target = e.target.parentNode;
			} else {
				foundDragKey = true;
			}
		}
		let dragKey = parseInt(e.target.getAttribute("drag-key"));
		setCurrentDraggingItem(dragKey);
	}

	function onDragEnd() {
		setCurrentDraggingItem(null);
		onDropItem(JSON.parse(JSON.stringify(changedOrder)));
		setChangedOrder(null);
	}

	function onDragEnter() {
		setChangedOrder({ from: currentDraggingItem, to: index });
	}

	return { dragDropItemClassName, onDragStart, onDragEnd, onDragEnter };
};
