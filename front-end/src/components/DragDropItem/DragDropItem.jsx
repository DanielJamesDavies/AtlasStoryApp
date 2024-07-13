// Packages

// Components

// Logic
import { DragDropItemLogic } from "./DragDropItemLogic";

// Context

// Styles
import "./DragDropItem.css";

// Assets

export const DragDropItem = ({
	children,
	index,
	orderIndex,
	dragDropListId,
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
	onMouseDown,
	onMouseMove,
	onMouseUp,
	onMouseLeave,
}) => {
	const { dragDropItemClassName, dragDropItemRef, onDragStart, onDragEnd, onDragEnter } = DragDropItemLogic({
		index,
		orderIndex,
		dragDropListId,
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
	});

	return (
		<div
			ref={dragDropItemRef}
			drag-drop-list-id={dragDropListId}
			drag-key={index}
			className={dragDropItemClassName}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onDragEnter={onDragEnter}
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave}
		>
			{children}
		</div>
	);
};
