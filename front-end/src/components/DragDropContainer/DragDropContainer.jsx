// Packages

// Components

// Logic
import { DragDropContainerLogic } from "./DragDropContainerLogic";

// Context

// Styles

// Assets

export const DragDropContainer = ({
	children,
	innerRef,
	className,
	style,
	inlineItems,
	enableDragDrop,
	onDropItem,
	afterOnTouchMove,
	afterOnTouchEnd,
}) => {
	const { updatedChildren, dragDropContainerClassName } = DragDropContainerLogic({
		children,
		className,
		inlineItems,
		enableDragDrop,
		onDropItem,
		afterOnTouchMove,
		afterOnTouchEnd,
	});

	return (
		<div ref={innerRef} draggable='false' className={dragDropContainerClassName} style={style === undefined ? {} : style}>
			{enableDragDrop ? updatedChildren : children}
		</div>
	);
};
