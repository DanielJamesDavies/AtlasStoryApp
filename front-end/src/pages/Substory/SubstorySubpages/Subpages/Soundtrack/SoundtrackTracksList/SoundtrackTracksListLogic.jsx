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
	const { substory, setSubstory, substorySoundtrack, setSubstorySoundtrack } = useContext(SubstoryContext);

	function changeTrackText(e, track_uri) {
		if (substorySoundtrack) {
			setSubstorySoundtrack((oldSubstorySoundtrack) => {
				let newSubstorySoundtrack = JSON.parse(JSON.stringify(oldSubstorySoundtrack));
				if (!newSubstorySoundtrack?.tracks) return newSubstorySoundtrack;
				const trackIndex = newSubstorySoundtrack?.tracks?.findIndex((e) => e.uri === track_uri);
				if (trackIndex !== -1) newSubstorySoundtrack.tracks[trackIndex].text = e.target.value.split("\n");
				return newSubstorySoundtrack;
			});
		} else {
			setSubstory((oldSubstory) => {
				let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
				if (!newSubstory?.data?.soundtrack?.tracks) return newSubstory;
				const trackIndex = newSubstory?.data?.soundtrack?.tracks?.findIndex((e) => e.uri === track_uri);
				if (trackIndex !== -1) newSubstory.data.soundtrack.tracks[trackIndex].text = e.target.value.split("\n");
				return newSubstory;
			});
		}
	}

	return { substory, substorySoundtrack, changeTrackText };
};
