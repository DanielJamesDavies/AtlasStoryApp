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
	currentDraggingItem,
	setCurrentDraggingItem,
	changedOrder,
	setChangedOrder,
}) => {
	const { dragDropItemClassName, onDragStart, onDragEnd, onDragEnter } = DragDropItemLogic({
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
	});

	return (
		<div drag-key={index} className={dragDropItemClassName} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragEnter={onDragEnter}>
			{children}
		</div>
	);
};
