// Packages
import { useContext, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

// Components

// Logic

// Context
import { StoryboardContext } from "../../StoryboardContext";

// Services

// Styles

// Assets

export const LayersLogic = () => {
	const {
		layers,
		setLayers,
		pieces,
		setPieces,
		elapsedTime,
		setElapsedTime,
		fullDuration,
		fromMediaDraggingContent,
		fromMediaDraggingContentID,
		setFromMediaDraggingContentID,
		draggingLayerPiece,
		setDraggingLayerPiece,
	} = useContext(StoryboardContext);

	const layersContainerRef = useRef(null);
	const timeSliderRef = useRef(null);

	const updateElapsedTime = (clientX) => {
		const { left } = timeSliderRef.current.getBoundingClientRect();
		let newElapsedTime = ((clientX - left) / (fullDuration * 32)) * fullDuration;
		newElapsedTime = Math.min(Math.max(0, newElapsedTime), fullDuration);
		setElapsedTime(newElapsedTime);

		const scrollAmountLeft = Math.min(0, clientX - left - 40 - layersContainerRef?.current?.scrollLeft);
		const scrollAmountRight = Math.max(
			0,
			clientX - left + 40 - (layersContainerRef?.current?.clientWidth + layersContainerRef?.current?.scrollLeft)
		);
		layersContainerRef.current.scrollLeft += scrollAmountLeft === 0 ? scrollAmountRight : scrollAmountLeft;
	};

	const handleInteractionStart = (clientX) => {
		updateElapsedTime(clientX);

		const handleInteractionMove = (moveEvent) => {
			updateElapsedTime(moveEvent.clientX || moveEvent.touches[0].clientX);
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

	const handleMouseDown = (event) => {
		event.preventDefault();
		handleInteractionStart(event.clientX);
	};

	const handleTouchStart = (event) => {
		event.preventDefault();
		handleInteractionStart(event.touches[0].clientX);
	};

	function secondsToFormattedTime(seconds) {
		const days = Math.floor(seconds / (3600 * 24))
			.toString()
			.padStart(2, "0");
		seconds %= 3600 * 24;

		const hours = Math.floor(seconds / 3600)
			.toString()
			.padStart(2, "0");
		seconds %= 3600;

		const minutes = Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0");

		seconds = Math.floor(seconds % 60)
			.toString()
			.padStart(2, "0");

		let formatted_time = "";
		if (days > 0) {
			formatted_time += days + ":";
		}
		if (hours > "00" || days > "00") {
			formatted_time += hours + ":";
		}
		formatted_time += minutes + ":" + seconds;

		if (formatted_time.trim() === "NaN") return "00:00";
		return formatted_time.trim();
	}

	function onLayerDragOver(layer_index) {
		// From Media Dragging Content
		if (fromMediaDraggingContent !== false) {
			let newFromMediaDraggingContentID = JSON.parse(JSON.stringify(fromMediaDraggingContentID));
			if (newFromMediaDraggingContentID === false) {
				newFromMediaDraggingContentID = uuidv4();
				setFromMediaDraggingContentID(newFromMediaDraggingContentID);
				setPieces((oldValue) => {
					let newValue = JSON.parse(JSON.stringify(oldValue));
					try {
						let new_start_time = elapsedTime;
						let new_end_time = elapsedTime + 30;
						if (fullDuration - elapsedTime < 30) {
							new_start_time = fullDuration;
							new_end_time = Math.max(0, fullDuration - 30);
						}
						newValue.push({
							id: newFromMediaDraggingContentID,
							name: "",
							piece_type: "text",
							content: "Text",
							start_time: new_start_time,
							end_time: new_end_time,
						});
						return newValue;
					} catch {
						return oldValue;
					}
				});
			}

			setLayers((oldValue) => {
				let newValue = JSON.parse(JSON.stringify(oldValue));
				try {
					const index = newValue.findIndex((e) => e.pieces.includes(newFromMediaDraggingContentID));
					if (index !== layer_index) {
						if (index !== -1) newValue[index].pieces = newValue[index].pieces.filter((e) => e !== newFromMediaDraggingContentID);
						newValue[layer_index].pieces.push(newFromMediaDraggingContentID);
					}
					return getCleanLayers(newValue);
				} catch {
					return getCleanLayers(oldValue);
				}
			});
		}
	}

	function onLayerMouseOver(layer_index) {
		if (draggingLayerPiece) {
			// On Drag Piece Between Layers
			const newDraggingLayerPiece = JSON.parse(JSON.stringify(draggingLayerPiece));

			setLayers((oldValue) => {
				let newValue = JSON.parse(JSON.stringify(oldValue));
				try {
					if (layer_index !== -1) {
						const index = newValue.findIndex((e) => e.pieces.includes(newDraggingLayerPiece));
						if (index !== layer_index) {
							if (index !== -1) newValue[index].pieces = newValue[index].pieces.filter((e) => e !== newDraggingLayerPiece);
							newValue[layer_index].pieces.push(newDraggingLayerPiece);
						}
					} else {
						const index = newValue.findIndex((e) => e.pieces.includes(newDraggingLayerPiece));
						if (index !== -1) newValue[index].pieces = newValue[index].pieces.filter((e) => e !== newDraggingLayerPiece);
						newValue = [{ pieces: [newDraggingLayerPiece] }].concat(newValue);
					}
					return getCleanLayers(newValue);
				} catch (e) {
					return getCleanLayers(oldValue);
				}
			});
		}
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

	function onLayerMouseUp() {
		setDraggingLayerPiece(false);
	}

	return {
		layers,
		pieces,
		elapsedTime,
		fullDuration,
		layersContainerRef,
		timeSliderRef,
		handleMouseDown,
		handleTouchStart,
		secondsToFormattedTime,
		onLayerDragOver,
		onLayerMouseOver,
		onLayerMouseUp,
	};
};
