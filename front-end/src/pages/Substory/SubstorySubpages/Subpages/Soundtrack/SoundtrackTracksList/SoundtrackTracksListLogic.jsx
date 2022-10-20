// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";

// Services

// Styles

// Assets

export const SoundtrackTracksListLogic = () => {
	const { substory, substorySoundtrack, setSubstorySoundtrack } = useContext(SubstoryContext);

	function changeTrackText(e, track_uri) {
		setSubstorySoundtrack((oldSubstorySoundtrack) => {
			let newSubstorySoundtrack = JSON.parse(JSON.stringify(oldSubstorySoundtrack));
			if (!newSubstorySoundtrack?.tracks) return newSubstorySoundtrack;
			const trackIndex = newSubstorySoundtrack?.tracks?.findIndex((e) => e.uri === track_uri);
			if (trackIndex !== -1) newSubstorySoundtrack.tracks[trackIndex].text = e.target.value.split("\n");
			return newSubstorySoundtrack;
		});
	}

	return { substory, substorySoundtrack, changeTrackText };
};
