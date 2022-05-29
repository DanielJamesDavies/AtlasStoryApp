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
	const { dragDropItemClassName, onDragStart, onDragEnd, onDragEnter, onTouchStart, onTouchEnd, onTouchMove } = DragDropItemLogic({
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
	});

	return (
		<div
			drag-key={index}
			className={dragDropItemClassName}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onDragEnter={onDragEnter}
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
			onTouchMove={onTouchMove}
		>
			{children}
		</div>
	);
};
