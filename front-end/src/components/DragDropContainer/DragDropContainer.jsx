// Packages

// Components

// Logic
import { DragDropContainerLogic } from "./DragDropContainerLogic";

// Context

// Styles
import "./DragDropContainer.css";

// Assets

export const DragDropContainer = ({
	children,
	innerRef,
	className,
	style,
	inlineItems,
	enableDragDrop,
	onDropItem,
	includeVerticalDrag,
	absoluteVerticalDrag,
	afterOnTouchMove,
	afterOnTouchEnd,
}) => {
	const { updatedChildren, dragDropContainerClassName, dragDropContainerRef, scrollDragDropList } = DragDropContainerLogic({
		children,
		innerRef,
		className,
		inlineItems,
		enableDragDrop,
		onDropItem,
		includeVerticalDrag,
		absoluteVerticalDrag,
		afterOnTouchMove,
		afterOnTouchEnd,
	});

	return (
		<div
			ref={innerRef ? innerRef : dragDropContainerRef}
			draggable='false'
			className={dragDropContainerClassName}
			style={style === undefined ? {} : style}
		>
			{!includeVerticalDrag ? null : (
				<>
					<div
						className='drag-drop-scroll-top'
						onPointerEnter={(e) => scrollDragDropList(e, -1)}
						onPointerLeave={(e) => scrollDragDropList(e, 0)}
						onMouseLeave={(e) => scrollDragDropList(e, 0)}
						onDragEnter={(e) => scrollDragDropList(e, -1)}
						onDragLeave={(e) => scrollDragDropList(e, 0)}
					/>
				</>
			)}
			{enableDragDrop ? updatedChildren : children}
			{!includeVerticalDrag ? null : (
				<>
					<div
						className='drag-drop-scroll-bottom'
						onPointerEnter={(e) => scrollDragDropList(e, 1)}
						onPointerLeave={(e) => scrollDragDropList(e, 0)}
						onMouseLeave={(e) => scrollDragDropList(e, 0)}
						onDragEnter={(e) => scrollDragDropList(e, 1)}
						onDragLeave={(e) => scrollDragDropList(e, 0)}
					/>
				</>
			)}
		</div>
	);
};
