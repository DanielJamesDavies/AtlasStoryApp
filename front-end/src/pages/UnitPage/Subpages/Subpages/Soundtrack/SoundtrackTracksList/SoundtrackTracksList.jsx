// Packages

// Components
import { SoundtrackTracksListItem } from "./SoundtrackTracksListItem";

// Logic
import { SoundtrackTracksListLogic } from "./SoundtrackTracksListLogic";

// Context

// Services

// Styles

// Assets

export const SoundtrackTracksList = ({ isEditing }) => {
	const { unit, unitSoundtrack, changeTrackText } = SoundtrackTracksListLogic();

	return (
		<div className='unit-page-subpage-soundtrack-tracks-list'>
			{unitSoundtrack
				? unitSoundtrack?.tracks?.map((track, index) => (
						<SoundtrackTracksListItem key={index} track={track} index={index} isEditing={isEditing} changeTrackText={changeTrackText} />
				  ))
				: unit?.data?.soundtrack?.tracks?.map((track, index) => (
						<SoundtrackTracksListItem key={index} track={track} index={index} isEditing={isEditing} changeTrackText={changeTrackText} />
				  ))}
		</div>
	);
};
