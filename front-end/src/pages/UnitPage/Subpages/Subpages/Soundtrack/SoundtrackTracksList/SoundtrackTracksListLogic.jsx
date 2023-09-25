// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";

// Services

// Styles

// Assets

export const SoundtrackTracksListLogic = () => {
	const { unit, setUnit, unitSoundtrack, setUnitSoundtrack } = useContext(UnitPageContext);

	function changeTrackText(e, track_uri) {
		if (unitSoundtrack) {
			setUnitSoundtrack((oldUnitSoundtrack) => {
				let newUnitSoundtrack = JSON.parse(JSON.stringify(oldUnitSoundtrack));
				if (!newUnitSoundtrack?.tracks) return newUnitSoundtrack;
				const trackIndex = newUnitSoundtrack?.tracks?.findIndex((e) => e.uri === track_uri);
				if (trackIndex !== -1) newUnitSoundtrack.tracks[trackIndex].text = e.target.value.split("\n");
				return newUnitSoundtrack;
			});
		} else {
			setUnit((oldUnit) => {
				let newUnit = JSON.parse(JSON.stringify(oldUnit));
				if (!newUnit?.data?.soundtrack?.tracks) return newUnit;
				const trackIndex = newUnit?.data?.soundtrack?.tracks?.findIndex((e) => e.uri === track_uri);
				if (trackIndex !== -1) newUnit.data.soundtrack.tracks[trackIndex].text = e.target.value.split("\n");
				return newUnit;
			});
		}
	}

	return { unit, unitSoundtrack, changeTrackText };
};
