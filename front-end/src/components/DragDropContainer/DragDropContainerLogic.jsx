// Packages
import { useEffect, useState, cloneElement } from "react";

// Components

// Logic

// Context

// Styles

// Assets

export const DragDropContainerLogic = ({ children, className, inlineItems, enableDragDrop, onDropItem, afterOnTouchMove, afterOnTouchEnd }) => {
	const [updatedChildren, setUpdatedChildren] = useState(null);
	const [currentDraggingItem, setCurrentDraggingItem] = useState(null);
	const [changedOrder, setChangedOrder] = useState(null);
	const [isUsingTouch, setIsUsingTouch] = useState(false);

	useEffect(() => {
		function getUpdatedChildren() {
			if (children === undefined) return null;

			let order = children?.map((child, index) => index);
			let newChangedOrder = JSON.parse(JSON.stringify(changedOrder));

			if (newChangedOrder?.from !== undefined && newChangedOrder?.to !== undefined) {
				let tempItem = order.splice(newChangedOrder?.from, 1)[0];
				order.splice(newChangedOrder?.to, 0, tempItem);
			}

			let newUpdatedChildren = order?.map((orderIndex, index) => {
				if (children.findIndex((child) => child?.props?.index === orderIndex) === -1) return false;
				return cloneElement(
					children.find((child) => child?.props?.index === orderIndex),
					{
						index,
						orderIndex,
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
					}
				);
			});
			newUpdatedChildren = newUpdatedChildren.filter((e) => e !== false);

			return newUpdatedChildren;
		}

		setUpdatedChildren(getUpdatedChildren());
	}, [
		setUpdatedChildren,
		children,
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
	]);

	const [dragDropContainerClassName, setDragDropContainerClassName] = useState("drag-drop-list");

	useEffect(() => {
		function getDragDropContainerClassName() {
			let newClassName = "drag-drop-list";
			if (className) newClassName += " " + className;
			if (inlineItems) newClassName += " drag-drop-list-inline";
			return newClassName;
		}
		setDragDropContainerClassName(getDragDropContainerClassName());
	}, [setDragDropContainerClassName, className, inlineItems]);

	return { updatedChildren, dragDropContainerClassName };
};
