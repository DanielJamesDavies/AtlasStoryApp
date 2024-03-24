// Packages
import { useCallback, useContext, useRef } from "react";

// Components

// Logic

// Context
import { StoryboardContext } from "../../StoryboardContext";

// Services

// Styles

// Assets

export const ControlsLogic = () => {
	const { isPlaying, setIsPlaying, elapsedTime, setElapsedTime, fullDuration, setVolume } = useContext(StoryboardContext);

	const controlsContainerRef = useRef();

	const toggleIsPlaying = useCallback(() => {
		setIsPlaying((oldValue) => !oldValue);
	}, [setIsPlaying]);

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

	function onMouseDown(e) {
		e.preventDefault();
		controlsContainerRef.current.focus();
	}

	function onKeyDown(e) {
		e.preventDefault();
		switch (e?.code) {
			case "ArrowLeft":
				setElapsedTime((oldValue) => Math.max(0, oldValue - 5));
				break;
			case "ArrowRight":
				setElapsedTime((oldValue) => Math.min(fullDuration, oldValue + 5));
				break;
			case "ArrowDown":
				setVolume((oldValue) => Math.max(0, oldValue - 0.1));
				break;
			case "ArrowUp":
				setVolume((oldValue) => Math.min(1, oldValue + 0.1));
				break;
			default:
				break;
		}
	}

	return { controlsContainerRef, onMouseDown, isPlaying, toggleIsPlaying, elapsedTime, fullDuration, secondsToFormattedTime, onKeyDown };
};
