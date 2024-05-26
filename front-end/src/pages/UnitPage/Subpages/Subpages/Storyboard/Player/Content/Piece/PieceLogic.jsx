// Packages
import { useCallback, useContext, useEffect, useRef, useState } from "react";

// Components

// Logic

// Context
import { StoryboardContext } from "../../../StoryboardContext";
import { SpotifyContext } from "../../../../../../../../context/SpotifyContext";

// Services

// Styles

// Assets

export const PieceLogic = ({ piece, piecesRef }) => {
	const {
		isPlaying,
		elapsedTime,
		elapsedTimeRef,
		layers,
		openPieceID,
		setOpenPieceID,
		pieces,
		setPieces,
		lastTimeReleaseTimeline,
		content_images,
	} = useContext(StoryboardContext);
	const { playSpotifyTrack } = useContext(SpotifyContext);

	const pieceContainerRef = useRef();

	const [isInPieceTime, setIsInPieceTime] = useState(false);

	const timeout = useRef();

	const playing_playlist_track_uri = useRef(false);
	const playing_playlist_track_last_time_release_timeline = useRef(0);
	const getNewTimeout = useCallback(() => {
		// Play Platlist Track
		if (piece?.piece_type === "playlist") {
			const current_track = piece?.playlist?.tracks?.find((e) => e?.end_time - elapsedTime > 0);
			if (!isPlaying) {
				playing_playlist_track_uri.current = false;
			} else {
				if (
					(playing_playlist_track_uri.current !== current_track?.uri ||
						playing_playlist_track_last_time_release_timeline.current + 600 < lastTimeReleaseTimeline) &&
					elapsedTimeRef?.current >= current_track?.start_time - 0.05 &&
					elapsedTimeRef?.current < current_track?.end_time - 0.05
				) {
					playing_playlist_track_uri.current = current_track?.uri;
					playing_playlist_track_last_time_release_timeline.current = JSON.parse(JSON.stringify(lastTimeReleaseTimeline));
					if (current_track?.uri.split(":")[1] === "track") {
						playSpotifyTrack(current_track?.uri, {
							position_ms: (elapsedTimeRef?.current - current_track?.start_time) * 1000,
							pause: !isPlaying,
						});
					} else {
						// If Local Track
						playSpotifyTrack(piece?.playlist?.playlist_uri, {
							local_uri: current_track?.uri,
							position_ms: (elapsedTimeRef?.current - current_track?.start_time) * 1000,
							pause: !isPlaying,
						});
					}
				}
			}

			return true;
		}

		const time_till_start = piece.start_time - elapsedTime;
		const time_till_end = piece.end_time - elapsedTime;

		if (time_till_start > 0) {
			setIsInPieceTime(false);
			if (isPlaying) {
				timeout.current = setTimeout(() => {
					setIsInPieceTime(true);
				}, time_till_start * 1000);
			}
		} else if (time_till_end > 0) {
			setIsInPieceTime(true);
			if (isPlaying) {
				timeout.current = setTimeout(() => {
					setIsInPieceTime(false);
				}, time_till_end * 1000);
			}
		} else {
			setIsInPieceTime(false);
			clearTimeout(timeout.current);
		}
	}, [elapsedTime, isPlaying, piece, elapsedTimeRef, playSpotifyTrack, lastTimeReleaseTimeline]);

	useEffect(() => {
		getNewTimeout();
		return () => clearTimeout(timeout.current);
	}, [isPlaying, piece, getNewTimeout, lastTimeReleaseTimeline]);

	const [pieceSlow, setPieceSlow] = useState(piece);
	const pieceSlowLastTimeUpdated = useRef(0);
	const pieceSlowTimeout = useRef(false);

	useEffect(() => {
		const max_update_interval_ms = 500;
		if (Date.now() - pieceSlowLastTimeUpdated?.current > max_update_interval_ms) {
			setPieceSlow(piece);
		} else {
			if (pieceSlowTimeout.current !== false) clearTimeout(pieceSlowTimeout.current);
			pieceSlowTimeout.current = setTimeout(() => {
				setPieceSlow(piece);
				pieceSlowTimeout.current = false;
			}, max_update_interval_ms - (Date.now() - pieceSlowLastTimeUpdated?.current));
			return () => {
				clearTimeout(pieceSlowTimeout.current);
			};
		}
		pieceSlowLastTimeUpdated.current = Date.now();
	}, [piece]);

	// Play Track
	useEffect(() => {
		if (pieceSlow?.piece_type === "track") {
			if (elapsedTimeRef?.current >= pieceSlow?.start_time - 0.05 && elapsedTimeRef?.current < pieceSlow?.end_time - 0.05) {
				playSpotifyTrack("spotify:track:" + pieceSlow?.content, {
					position_ms: (elapsedTimeRef?.current - pieceSlow?.start_time) * 1000,
					pause: !isPlaying,
				});
			}
		}
	}, [isInPieceTime, isPlaying, lastTimeReleaseTimeline, playSpotifyTrack, elapsedTimeRef, pieceSlow]);

	function onClick() {
		setOpenPieceID(piece?.id);
	}

	const startDelta = useRef(false);
	const startPos = useRef(false);

	const updatePiecePosition = (clientX, clientY, type, id) => {
		let oldPiece = JSON.parse(JSON.stringify(pieces))?.find((e) => e?.id === piece?.id);

		const piecesBoundingClientRect = piecesRef.current.getBoundingClientRect();
		const pieceContainerBoundingClientRect = pieceContainerRef.current.getBoundingClientRect();

		const oldWidth = oldPiece?.width || (pieceContainerBoundingClientRect?.width / piecesBoundingClientRect?.width) * 1920;
		const oldHeight = oldPiece?.height || (pieceContainerBoundingClientRect?.height / piecesBoundingClientRect?.height) * 1080;

		let newX = oldPiece.posX;
		let newY = oldPiece.posY;
		let newWidth = JSON.parse(JSON.stringify(oldWidth));
		let newHeight = JSON.parse(JSON.stringify(oldHeight));

		if (type === undefined) {
			newX = clientX - piecesBoundingClientRect?.left;
			newY = clientY - piecesBoundingClientRect?.top;

			newX = (Math.max(0, Math.min(newX, piecesBoundingClientRect?.width - 12)) / piecesBoundingClientRect?.width) * 1920;
			newY = (Math.max(0, Math.min(newY, piecesBoundingClientRect?.height - 12)) / piecesBoundingClientRect?.height) * 1080;

			// Set Start Delta X for Moving Piece
			if (startDelta.current === false) {
				startDelta.current = [newX - oldPiece.posX, newY - oldPiece.posY];
				return false;
			} else {
				newX -= startDelta.current[0];
				newY -= startDelta.current[1];
			}
		} else if (type === "grabber") {
			const grabber_vertical_position = id.split("-")[0];
			const grabber_horizontal_position = id.split("-")[1];

			let mousePointX = clientX - piecesBoundingClientRect?.left;
			let mousePointY = clientY - piecesBoundingClientRect?.top;

			mousePointX = (mousePointX / piecesBoundingClientRect?.width) * 1920;
			mousePointY = (mousePointY / piecesBoundingClientRect?.height) * 1080;

			// Set Start Delta X for Moving Piece
			if (startPos.current === false) {
				startPos.current = [
					mousePointX,
					mousePointY,
					mousePointX + newWidth,
					mousePointY + newHeight,
					mousePointX - newWidth,
					mousePointY - newHeight,
				];
				return false;
			}

			if (grabber_vertical_position === "top" && grabber_horizontal_position === "center") {
				newY += mousePointY - startPos.current[1];
				newHeight = startPos.current[3] - newY;
			}

			if (grabber_vertical_position === "center" && grabber_horizontal_position === "left") {
				newX += mousePointX - startPos.current[0];
				newWidth = startPos.current[2] - newX;
			}

			if (grabber_vertical_position === "bottom" && grabber_horizontal_position === "center") {
				newHeight = mousePointY - startPos.current[5];
			}

			if (grabber_vertical_position === "center" && grabber_horizontal_position === "right") {
				newWidth = mousePointX - startPos.current[4];
			}

			if (grabber_vertical_position === "bottom" && grabber_horizontal_position === "right") {
				newWidth = mousePointX - startPos.current[4];
				newHeight = mousePointY - startPos.current[5];
			}

			if (grabber_vertical_position === "bottom" && grabber_horizontal_position === "left") {
				newHeight = mousePointY - startPos.current[5];
				newX += mousePointX - startPos.current[0];
				newWidth = startPos.current[2] - newX;
			}

			if (grabber_vertical_position === "top" && grabber_horizontal_position === "left") {
				newX += mousePointX - startPos.current[0];
				newWidth = startPos.current[2] - newX;
				newY += mousePointY - startPos.current[1];
				newHeight = startPos.current[3] - newY;
			}

			if (grabber_vertical_position === "top" && grabber_horizontal_position === "right") {
				newWidth = mousePointX - startPos.current[4];
				newY += mousePointY - startPos.current[1];
				newHeight = startPos.current[3] - newY;
			}
		}

		setPieces((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue.findIndex((e) => e?.id === piece?.id);
			if (index === -1) return newValue;
			newValue[index].posX = newX;
			newValue[index].posY = newY;
			newValue[index].width = newWidth;
			newValue[index].height = newHeight;
			return newValue;
		});
	};

	const handleInteractionStart = (clientX, clientY, type, id) => {
		startDelta.current = false;
		startPos.current = false;
		updatePiecePosition(clientX, clientY, type, id);

		const handleInteractionMove = (moveEvent) => {
			moveEvent.preventDefault();
			const x = moveEvent.clientX || moveEvent.touches[0].clientX;
			const y = moveEvent.clientY || moveEvent.touches[0].clientY;
			updatePiecePosition(x, y, type, id);
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

	const handleMouseDown = (event, type, id) => {
		event.stopPropagation();
		handleInteractionStart(event.clientX, event.clientY, type, id);
	};

	const handleTouchStart = (event, type, id) => {
		event.preventDefault();
		event.stopPropagation();
		handleInteractionStart(event.touches[0].clientX, event.touches[0].clientY, type, id);
	};

	return { pieceContainerRef, isInPieceTime, layers, openPieceID, onClick, handleMouseDown, handleTouchStart, content_images };
};
