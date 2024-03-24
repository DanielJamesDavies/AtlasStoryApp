// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// Components

// Logic
import { PieceLogic } from "./PieceLogic";

// Context

// Services

// Styles
import "./Piece.css";

// Assets

export const Piece = ({ piece }) => {
	const {
		pieceContainerRef,
		openPieceID,
		handleMouseDown,
		handleTouchStart,
		onDragStart,
		onDragEnd,
		onMouseUp,
		onClick,
		isDisplayingContextMenu,
		contextMenuLeft,
		removePiece,
	} = PieceLogic({ piece });

	if (!piece) return null;
	return (
		<div
			ref={pieceContainerRef}
			className={
				"unit-page-storyboard-editor-layer-piece-container" +
				(openPieceID === piece?.id ? " unit-page-storyboard-editor-layer-piece-container-active" : "")
			}
			style={{ "--start_position": piece?.start_time * 32 + "px", "--piece_width": piece?.end_time * 32 - piece?.start_time * 32 + "px" }}
			onMouseDown={(e) => handleMouseDown(e)}
			onTouchStart={(e) => handleTouchStart(e)}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onMouseUp={onMouseUp}
			onClick={onClick}
		>
			<div
				className='unit-page-storyboard-editor-layer-piece-side unit-page-storyboard-editor-layer-piece-side-left'
				onMouseDown={(e) => handleMouseDown(e, "left")}
				onTouchStart={(e) => handleTouchStart(e, "left")}
			></div>
			<div
				className='unit-page-storyboard-editor-layer-piece-side unit-page-storyboard-editor-layer-piece-side-right'
				onMouseDown={(e) => handleMouseDown(e, "right")}
				onTouchStart={(e) => handleTouchStart(e, "right")}
			></div>
			<div
				className={
					"unit-page-storyboard-editor-layer-piece" + (openPieceID === piece?.id ? " unit-page-storyboard-editor-layer-piece-active" : "")
				}
			>
				<div className='unit-page-storyboard-editor-layer-piece-name-container'>
					<div className='unit-page-storyboard-editor-layer-piece-name'>
						{piece?.piece_type === "text" ? 'Text "' + piece?.content + '"' : piece?.name}
					</div>
				</div>
				<div className='unit-page-storyboard-editor-layer-piece-content-container'>
					{Array(Math.max(0, Math.floor((piece?.end_time * 32 - piece?.start_time * 32) / 120)))
						.fill(0)
						.map((_, index) => (
							<div key={index} className='unit-page-storyboard-editor-layer-piece-content'>
								{piece?.content}
							</div>
						))}
				</div>
			</div>
			<div
				className={
					"unit-page-storyboard-editor-layer-piece-context-menu" +
					(isDisplayingContextMenu ? " unit-page-storyboard-editor-layer-piece-context-menu-is-displaying" : "")
				}
				style={{ "--context-menu-left": contextMenuLeft + "px" }}
			>
				<button onClick={removePiece}>
					<FontAwesomeIcon icon={faTrash} />
					<span>Remove</span>
				</button>
			</div>
		</div>
	);
};
