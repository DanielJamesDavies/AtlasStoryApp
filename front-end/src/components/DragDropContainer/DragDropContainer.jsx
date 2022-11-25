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
	afterOnTouchMove,
	afterOnTouchEnd,
}) => {
	const { updatedChildren, dragDropContainerClassName, dragDropContainerRef, scrollDragDropList } = DragDropContainerLogic({
		children,
		className,
		inlineItems,
		enableDragDrop,
		onDropItem,
		includeVerticalDrag,
		afterOnTouchMove,
		afterOnTouchEnd,
	});

	return (
		<div ref={dragDropContainerRef} className='drag-drop-container'>
			<div ref={innerRef} draggable='false' className={dragDropContainerClassName} style={style === undefined ? {} : style}>
				{enableDragDrop ? updatedChildren : children}
			</div>
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
