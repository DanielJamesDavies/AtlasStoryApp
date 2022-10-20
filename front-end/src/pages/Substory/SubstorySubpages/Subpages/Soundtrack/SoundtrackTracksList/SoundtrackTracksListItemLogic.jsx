// Packages
import { useEffect } from "react";
import { useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const SoundtrackTracksListItemLogic = ({ track }) => {
	const [artwork, setArtwork] = useState(false);

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

	return { artwork };
};
