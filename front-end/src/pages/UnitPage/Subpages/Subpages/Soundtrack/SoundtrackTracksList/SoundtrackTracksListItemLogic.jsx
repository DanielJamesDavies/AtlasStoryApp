// Packages
import { useState, useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const SoundtrackTracksListItemLogic = ({ track }) => {
	const [artwork, setArtwork] = useState(track?.artwork ? track.artwork : false);

	useEffect(() => {
		async function getArtwork() {
			if (track?.artwork) return setArtwork(track?.artwork);
			if (!track?.artwork_url) return setArtwork(false);

			try {
				const newArtwork = await new Promise(async (resolve) => {
					const artwork_response = await fetch(track?.artwork_url);
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result);
					reader.readAsDataURL(await artwork_response.blob());
				});
				setArtwork(newArtwork);
			} catch (e) {}
		}
		getArtwork();
	}, [track]);

	const [isDisplayingText, setIsDisplayingText] = useState(false);
	function toggleIsDisplayingText(e) {
		e.stopPropagation();
		setIsDisplayingText((oldIsDisplayingText) => !oldIsDisplayingText);
	}

	return { artwork, isDisplayingText, toggleIsDisplayingText };
};
