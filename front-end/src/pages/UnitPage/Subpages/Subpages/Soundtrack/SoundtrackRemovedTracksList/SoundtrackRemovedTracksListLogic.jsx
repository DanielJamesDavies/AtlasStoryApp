// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";

// Services

// Styles

// Assets

export const SoundtrackRemovedTracksListLogic = () => {
	const { unit, setUnit, unitSoundtrack } = useContext(UnitPageContext);

	function changeTrackText(e, track_uri) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			if (!newUnit?.data?.soundtrack?.tracks) return newUnit;
			const trackIndex = newUnit?.data?.soundtrack?.tracks?.findIndex((e) => e.uri === track_uri);
			if (trackIndex !== -1) newUnit.data.soundtrack.tracks[trackIndex].text = e.target.value.split("\n");
			return newUnit;
		});
	}

	function deleteTrack(track_uri) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			if (!newUnit?.data?.soundtrack?.tracks) return newUnit;
			const trackIndex = newUnit?.data?.soundtrack?.tracks?.findIndex((e) => e.uri === track_uri);
			if (trackIndex !== -1) newUnit.data.soundtrack.tracks.splice(trackIndex, 1);
			return newUnit;
		});
	}

	return { unit, unitSoundtrack, changeTrackText, deleteTrack };
};
