// Packages
import { useContext, useRef, useCallback } from "react";

// Components

// Logic

// Context
import { StoryboardContext } from "../../../StoryboardContext";
import { SpotifyContext } from "../../../../../../../../context/SpotifyContext";

// Services

// Styles

// Assets

export const VolumeControlLogic = () => {
	const { volume, setVolume, isMuted, setIsMuted } = useContext(StoryboardContext);
	const { changeSpotifyPlayerVolume } = useContext(SpotifyContext);

	const toggleIsMuted = useCallback(() => {
		let newIsMuted = isMuted ? false : true;
		setIsMuted(newIsMuted);
		changeSpotifyPlayerVolume(newIsMuted ? 0 : volume);
	}, [isMuted, setIsMuted, volume, changeSpotifyPlayerVolume]);

	const volumeControlSliderContainerRef = useRef(null);

	const updateVolume = (clientX) => {
		const { left, width } = volumeControlSliderContainerRef.current.getBoundingClientRect();
		const percent = Math.min(Math.max((clientX - left) / width, 0), 1);
		setVolume(percent);
		changeSpotifyPlayerVolume(percent);
	};

	const handleInteractionStart = (clientX) => {
		updateVolume(clientX);

		const handleInteractionMove = (moveEvent) => {
			updateVolume(moveEvent.clientX || moveEvent.touches[0].clientX);
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

	return { isMuted, toggleIsMuted, volume, volumeControlSliderContainerRef, handleMouseDown, handleTouchStart };
};
