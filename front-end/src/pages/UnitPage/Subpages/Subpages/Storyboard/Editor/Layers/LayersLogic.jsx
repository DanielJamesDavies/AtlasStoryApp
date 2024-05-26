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
		elapsedTimeRef,
		setLastTimeUpdatedElapsedTime,
		setLastTimeReleaseTimeline,
		fullDuration,
		fromMediaDraggingContent,
		fromMediaDraggingContentID,
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
		elapsedTimeRef.current = newElapsedTime;
		setLastTimeUpdatedElapsedTime(Date.now());

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
			setLastTimeReleaseTimeline(Date.now());
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
		const newFromMediaDraggingContent = JSON.parse(JSON.stringify(fromMediaDraggingContent));
		if (newFromMediaDraggingContent === false) return false;

		let newFromMediaDraggingContentID = JSON.parse(JSON.stringify(fromMediaDraggingContentID?.current));
		if (newFromMediaDraggingContentID !== false) return false;
		newFromMediaDraggingContentID = uuidv4();
		fromMediaDraggingContentID.current = newFromMediaDraggingContentID;

		setPieces((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			let min_length = 1;
			try {
				let newName = "";
				let newContent = "";
				let newWidth = 0;
				let newHeight = 0;
				let newPlaylist = {};
				switch (newFromMediaDraggingContent?.type) {
					case "text":
						newContent = "Text";
						break;
					case "image":
						newName = "Image";
						newContent = newFromMediaDraggingContent?.id;
						min_length = 10;
						newWidth = newFromMediaDraggingContent?.content_item?.width;
						newHeight = newFromMediaDraggingContent?.content_item.height;
						break;
					case "track":
						min_length = Math.max(1, (newFromMediaDraggingContent?.content_item?.duration_ms || 0) / 1000);
						newContent = newFromMediaDraggingContent?.id;
						break;
					case "playlist":
						newName = 'Playlist "Nova Cosmos: Apotheosis"';
						newContent = newFromMediaDraggingContent?.id;
						let playlist_track_previous_end_time = 0;
						newPlaylist = {
							playlist_uri: newFromMediaDraggingContent?.content_item?.uri,
							tracks: newFromMediaDraggingContent?.content_item?.tracks?.items?.map((item) => {
								const start_time = playlist_track_previous_end_time;
								const end_time = start_time + Math.max(1, (item?.track?.duration_ms || 0) / 1000);
								playlist_track_previous_end_time = end_time;
								return {
									id: item?.track?.id,
									uri: item?.track?.uri,
									source: "spotify",
									name: item?.track?.name,
									duration_ms: item?.track?.duration_ms,
									start_time: start_time,
									end_time: end_time,
									image: item?.track?.album?.images?.[0]?.url,
								};
							}),
						};
						break;
					default:
						break;
				}

				let new_start_time = elapsedTime;
				let new_end_time = elapsedTime + min_length;

				if (fullDuration - elapsedTime < min_length) {
					new_start_time = Math.max(0, fullDuration - min_length);
					new_end_time = fullDuration;
				}

				// Create New Piece
				newValue.push({
					id: newFromMediaDraggingContentID,
					name: newName,
					piece_type: newFromMediaDraggingContent?.type,
					content: newContent,
					start_time: new_start_time,
					end_time: new_end_time,
					posX: 0,
					posY: 0,
					width: newWidth,
					height: newHeight,
					playlist: newPlaylist,
				});
				return newValue;
			} catch {
				return oldValue;
			}
		});

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

		newValue = newValue.map((oldLayer) => {
			let newLayer = JSON.parse(JSON.stringify(oldLayer));
			newLayer.pieces = [...new Set(newLayer?.pieces)];
			return newLayer;
		});

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
