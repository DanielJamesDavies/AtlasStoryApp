// Packages
import { useCallback, useContext, useEffect, useRef, useState } from "react";

// Components

// Logic

// Context
import { StoryboardContext } from "../../../StoryboardContext";

// Services

// Styles

// Assets

export const PieceLogic = ({ piece }) => {
	const {
		setPieces,
		setLayers,
		elapsedTime,
		fullDuration,
		setDraggingLayerPiece,
		openPieceID,
		setOpenPieceID,
		setOpenMultiTabPane,
		spotifyTracks,
	} = useContext(StoryboardContext);

	const pieceContainerRef = useRef();

	const startDeltaX = useRef(0);
	const lastPositionX = useRef(0);

	const updateElapsedTime = (clientX, side) => {
		try {
			const { left, width } = pieceContainerRef.current.getBoundingClientRect();

			let delta = side !== "right" ? clientX - left : clientX - left - width;
			delta = Math.min(delta, 100);
			if (side === undefined) delta -= lastPositionX.current + startDeltaX.current - clientX;

			// Set Start Delta X for Moving Piece
			if (startDeltaX.current === false) {
				startDeltaX.current = delta;
				return false;
			}

			setPieces((oldValue) => {
				let newValue = JSON.parse(JSON.stringify(oldValue));
				const index = newValue?.findIndex((e) => e.id === piece?.id);
				if (index === -1) return newValue;

				// Get New Times
				let new_start_time = newValue[index]["start_time"] + delta / 32;
				let new_end_time = newValue[index]["end_time"] + delta / 32;

				// Keep within Timeline
				if (side === undefined && (new_start_time <= 0 || new_end_time >= fullDuration)) {
					if (new_start_time <= 0) {
						newValue[index]["start_time"] = 0;
						newValue[index]["end_time"] = newValue[index]["end_time"] - newValue[index]["start_time"];
					} else if (new_end_time >= fullDuration) {
						newValue[index]["start_time"] = Math.max(0, fullDuration - (newValue[index]["end_time"] - newValue[index]["start_time"]));
						newValue[index]["end_time"] = fullDuration;
					}
				} else {
					// Snap to Playhead
					const start_time_delta_from_elapsed_time = elapsedTime - new_start_time;
					const end_time_delta_from_elapsed_time = elapsedTime - new_end_time;

					if (Math.abs(start_time_delta_from_elapsed_time) < 0.25) {
						new_start_time += start_time_delta_from_elapsed_time;
						new_end_time += start_time_delta_from_elapsed_time;
					} else if (Math.abs(end_time_delta_from_elapsed_time) < 0.25) {
						new_start_time += end_time_delta_from_elapsed_time;
						new_end_time += end_time_delta_from_elapsed_time;
					}

					// Set Side Times
					if (side !== "right") {
						if (newValue[index]["end_time"] - Math.min(Math.max(0, new_start_time), fullDuration) > 0.5)
							newValue[index]["start_time"] = Math.min(Math.max(0, new_start_time), fullDuration);
					}

					if (side !== "left") {
						if (Math.min(Math.max(0.4, new_end_time), fullDuration) - newValue[index]["start_time"] > 0.5)
							newValue[index]["end_time"] = Math.min(Math.max(0.5, new_end_time), fullDuration);
					}
				}

				return newValue;
			});
		} catch {}
		lastPositionX.current = clientX;
	};

	const handleInteractionStart = (clientX, side) => {
		setDraggingLayerPiece(piece?.id);
		updateElapsedTime(clientX, side);

		const handleInteractionMove = (moveEvent) => {
			updateElapsedTime(moveEvent.clientX || moveEvent.touches[0].clientX, side);
		};

		const handleInteractionEnd = () => {
			document.removeEventListener("mousemove", handleInteractionMove);
			document.removeEventListener("mouseup", handleInteractionEnd);
			document.removeEventListener("touchmove", handleInteractionMove);
			document.removeEventListener("touchend", handleInteractionEnd);
		};

		document.addEventListener("mousemove", handleInteractionMove);
		document.addEventListener("mouseup", handleInteractionEnd);
		document.addEventListener("touchmove", handleInteractionMove);
		document.addEventListener("touchend", handleInteractionEnd);
	};

	const handleMouseDown = (e, side) => {
		e.preventDefault();
		e.stopPropagation();
		startDeltaX.current = false;
		lastPositionX.current = e.clientX;
		handleInteractionStart(e.clientX, side);
	};

	const handleTouchStart = (e, side) => {
		e.stopPropagation();
		startDeltaX.current = false;
		lastPositionX.current = e.touches[0].clientX;
		handleInteractionStart(e.touches[0].clientX, side);
	};

	function onDragStart(e) {
		e.preventDefault();
		setDraggingLayerPiece(piece?.id);
	}

	function onDragEnd() {
		setDraggingLayerPiece(false);
	}

	function onMouseUp() {
		setDraggingLayerPiece(false);
	}

	function onClick() {
		setOpenPieceID(piece?.id);
		setOpenMultiTabPane("details");
	}

	useEffect(() => {
		function onClick(e) {
			let shouldKeepOpenPieceID = false;
			let element = e.target;
			while (element) {
				if (
					element.classList &&
					(element.classList.contains("unit-page-storyboard-editor-multi-tab-pane-content-details") ||
						element.classList.contains("unit-page-storyboard-editor-top-bar-save-btn") ||
						element.classList.contains("unit-page-storyboard-player") ||
						element.classList.contains("unit-page-storyboard-editor-layers-time-slider"))
				) {
					shouldKeepOpenPieceID = true;
				}
				element = element?.parentNode;
			}

			if (!pieceContainerRef.current.contains(e.target) && !shouldKeepOpenPieceID) {
				setOpenPieceID(false);
				setOpenMultiTabPane("media");
			}
		}

		if (openPieceID === piece?.id) {
			window.addEventListener("click", onClick);
		}
		return () => window.removeEventListener("click", onClick);
	}, [pieceContainerRef, openPieceID, setOpenPieceID, setOpenMultiTabPane, piece]);

	const [isDisplayingContextMenu, setIsDisplayingContextMenu] = useState(false);
	const [contextMenuLeft, setContextMenuLeft] = useState(false);

	const onContextMenu = useCallback((e) => {
		e.preventDefault();

		const { left } = pieceContainerRef.current.getBoundingClientRect();

		setIsDisplayingContextMenu(true);
		setContextMenuLeft(e?.clientX - left);
	}, []);

	useEffect(() => {
		const pieceContainerRefCurrent = pieceContainerRef?.current;
		pieceContainerRefCurrent.addEventListener("contextmenu", onContextMenu, false);
		return () => pieceContainerRefCurrent.addEventListener("contextmenu", onContextMenu);
	}, [pieceContainerRef, onContextMenu]);

	useEffect(() => {
		function onClick() {
			setIsDisplayingContextMenu(false);
		}

		if (isDisplayingContextMenu) {
			window.addEventListener("click", onClick);
		}
		return () => window.removeEventListener("click", onClick);
	}, [isDisplayingContextMenu]);

	function removePiece(e) {
		e.stopPropagation();

		if (JSON.stringify(openPieceID) === JSON.stringify(piece?.id)) {
			setOpenPieceID(false);
			setOpenMultiTabPane("media");
		}

		setPieces((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue.findIndex((e) => e?.id === piece?.id);
			if (index === -1) return oldValue;
			newValue.splice(index, 1);
			return newValue;
		});
		setLayers((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue.findIndex((e) => e.pieces.includes(piece?.id));
			if (index !== -1) newValue[index].pieces = newValue[index].pieces.filter((e) => e !== piece?.id);
			return getCleanLayers(newValue);
		});
	}

	function getCleanLayers(oldValue) {
		let newValue = JSON.parse(JSON.stringify(oldValue));

		if (newValue.length > 4) newValue = newValue.filter((e) => e.pieces.length > 0);

		if (newValue.length < 4)
			newValue = Array(Math.max(0, 4 - newValue.length))
				.fill({ pieces: [] })
				.concat(newValue);

		return newValue;
	}

	return {
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
		spotifyTracks,
	};
};
