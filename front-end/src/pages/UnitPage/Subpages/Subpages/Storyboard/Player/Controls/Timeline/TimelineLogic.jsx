// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { StoryboardContext } from "../../../StoryboardContext";

// Services

// Styles

// Assets

export const TimelineLogic = () => {
	const { elapsedTime, setElapsedTime, fullDuration, setLastTimeUpdatedElapsedTime } = useContext(StoryboardContext);

	const timelineContainerRef = useRef(null);

	const updateElapsedTime = (clientX) => {
		const { left, width } = timelineContainerRef.current.getBoundingClientRect();
		const percentWatched = Math.min(Math.max((clientX - left) / width, 0), 1);
		setElapsedTime(percentWatched * fullDuration);
		setLastTimeUpdatedElapsedTime(Date.now());
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
		handleInteractionStart(event.clientX);
	};

	const handleTouchStart = (event) => {
		event.preventDefault();
		handleInteractionStart(event.touches[0].clientX);
	};

	return { elapsedTime, fullDuration, timelineContainerRef, handleMouseDown, handleTouchStart };
};
