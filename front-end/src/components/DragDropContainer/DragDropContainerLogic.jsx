// Packages
import { useEffect, useState, cloneElement, useRef } from "react";

// Components

// Logic

// Context

// Styles

// Assets

export const DragDropContainerLogic = ({
	children,
	innerRef,
	className,
	inlineItems,
	enableDragDrop,
	onDropItem,
	absoluteVerticalDrag,
	afterOnTouchMove,
	afterOnTouchEnd,
}) => {
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
			if (absoluteVerticalDrag) newClassName += " drag-drop-list-absolute-vertical-drag";
			return newClassName;
		}
		setDragDropContainerClassName(getDragDropContainerClassName());
	}, [setDragDropContainerClassName, className, inlineItems, absoluteVerticalDrag]);

	const dragDropContainerRef = useRef();
	const [dropDownListScrollInterval, setDropDownListScrollInterval] = useState(false);

	function scrollDragDropList(e, scrollValue) {
		if (e?.type === "pointerenter" && e?.pointerType !== "touch") return false;
		if (scrollValue !== 0 && e?.pointerType === "touch" && e?.button !== -1) return false;

		const dropDownListCurrent = innerRef ? innerRef.current : dragDropContainerRef.current;

		if (!dropDownListCurrent || scrollValue === 0) {
			clearInterval(dropDownListScrollInterval);
			setDropDownListScrollInterval(false);
			return;
		}

		var interval = setInterval(() => {
			if (
				scrollValue !== 0 &&
				dropDownListCurrent &&
				(dropDownListCurrent.scrollTop !== 0 || scrollValue > 0) &&
				(dropDownListCurrent.scrollTop !== dropDownListCurrent.scrollHeight - dropDownListCurrent.clientHeight || scrollValue < 0)
			) {
				dropDownListCurrent.scrollTop += scrollValue * 2;
			} else {
				clearInterval(interval);
				clearInterval(dropDownListScrollInterval);
				setDropDownListScrollInterval(false);
			}
		}, 2);
		setDropDownListScrollInterval(interval);
	}

	return { updatedChildren, dragDropContainerClassName, dragDropContainerRef, scrollDragDropList };
};
