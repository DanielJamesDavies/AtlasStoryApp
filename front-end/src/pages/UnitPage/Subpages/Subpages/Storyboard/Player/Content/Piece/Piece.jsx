// Packages

// Components

// Logic
import { PieceLogic } from "./PieceLogic";

// Context

// Services

// Styles
import "./Piece.css";

// Assets

export const Piece = ({ piece, piecesRef }) => {
	const { pieceContainerRef, isInPieceTime, layers, openPieceID, onClick, handleMouseDown, handleTouchStart, content_images } = PieceLogic({
		piece,
		piecesRef,
	});

	if (piece?.piece_type === "track") return null;

	return (
		<div
			ref={pieceContainerRef}
			className={
				"unit-page-storyboard-player-content-piece-container" +
				(isInPieceTime ? " unit-page-storyboard-player-content-piece-container-is-in-piece-time" : "") +
				(openPieceID === piece?.id ? " unit-page-storyboard-player-content-piece-container-is-displaying-piece-controls" : "")
			}
			style={{
				"--z-index": layers?.length + 1 - layers?.findIndex((e) => e.pieces.includes(piece?.id)),
				"--transformX": (piece?.posX || 0) + "px",
				"--transformY": (piece?.posY || 0) + "px",
				"--width": piece?.width ? piece?.width + "px" : "unset",
				"--height": piece?.height ? piece?.height + "px" : "unset",
			}}
			onClick={onClick}
			onMouseDown={handleMouseDown}
			onTouchStart={handleTouchStart}
		>
			<div className='unit-page-storyboard-player-content-controls'>
				<div className='unit-page-storyboard-player-content-controls-grabbers'>
					<div
						className='unit-page-storyboard-player-content-controls-grabber'
						onMouseDown={(e) => handleMouseDown(e, "grabber", "top-left")}
						onTouchStart={(e) => handleTouchStart(e, "grabber", "top-left")}
					></div>
					<div
						className='unit-page-storyboard-player-content-controls-grabber'
						onMouseDown={(e) => handleMouseDown(e, "grabber", "top-center")}
						onTouchStart={(e) => handleTouchStart(e, "grabber", "top-center")}
					></div>
					<div
						className='unit-page-storyboard-player-content-controls-grabber'
						onMouseDown={(e) => handleMouseDown(e, "grabber", "top-right")}
						onTouchStart={(e) => handleTouchStart(e, "grabber", "top-right")}
					></div>
					<div
						className='unit-page-storyboard-player-content-controls-grabber'
						onMouseDown={(e) => handleMouseDown(e, "grabber", "center-right")}
						onTouchStart={(e) => handleTouchStart(e, "grabber", "center-right")}
					></div>
					<div
						className='unit-page-storyboard-player-content-controls-grabber'
						onMouseDown={(e) => handleMouseDown(e, "grabber", "bottom-right")}
						onTouchStart={(e) => handleTouchStart(e, "grabber", "bottom-right")}
					></div>
					<div
						className='unit-page-storyboard-player-content-controls-grabber'
						onMouseDown={(e) => handleMouseDown(e, "grabber", "bottom-center")}
						onTouchStart={(e) => handleTouchStart(e, "grabber", "bottom-center")}
					></div>
					<div
						className='unit-page-storyboard-player-content-controls-grabber'
						onMouseDown={(e) => handleMouseDown(e, "grabber", "bottom-left")}
						onTouchStart={(e) => handleTouchStart(e, "grabber", "bottom-left")}
					></div>
					<div
						className='unit-page-storyboard-player-content-controls-grabber'
						onMouseDown={(e) => handleMouseDown(e, "grabber", "center-left")}
						onTouchStart={(e) => handleTouchStart(e, "grabber", "center-left")}
					></div>
				</div>
			</div>
			<div className='unit-page-storyboard-player-content-piece'>
				{piece?.piece_type === "image" ? (
					!content_images?.find((e) => e?.id === piece?.content)?.image ? null : (
						<img src={content_images?.find((e) => e?.id === piece?.content)?.image} alt='' />
					)
				) : (
					piece?.content
				)}
			</div>
		</div>
	);
};
