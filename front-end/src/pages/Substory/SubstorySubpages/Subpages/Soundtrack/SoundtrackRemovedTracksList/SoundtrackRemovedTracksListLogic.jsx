// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";

// Services

// Styles

// Assets

export const SoundtrackRemovedTracksListLogic = () => {
	const { substory, setSubstory, substorySoundtrack } = useContext(SubstoryContext);

	function changeTrackText(e, track_uri) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			if (!newSubstory?.data?.soundtrack?.tracks) return newSubstory;
			const trackIndex = newSubstory?.data?.soundtrack?.tracks?.findIndex((e) => e.uri === track_uri);
			if (trackIndex !== -1) newSubstory.data.soundtrack.tracks[trackIndex].text = e.target.value.split("\n");
			return newSubstory;
		});
	}

	function deleteTrack(track_uri) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			if (!newSubstory?.data?.soundtrack?.tracks) return newSubstory;
			const trackIndex = newSubstory?.data?.soundtrack?.tracks?.findIndex((e) => e.uri === track_uri);
			if (trackIndex !== -1) newSubstory.data.soundtrack.tracks.splice(trackIndex, 1);
			return newSubstory;
		});
	}

	return { substory, substorySoundtrack, changeTrackText, deleteTrack };
};
