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
	const { substory, substorySoundtrack, changeTrackText } = SoundtrackTracksListLogic();

	return (
		<div className='substory-subpage-soundtrack-tracks-list'>
			{substorySoundtrack
				? substorySoundtrack?.tracks?.map((track, index) => (
						<SoundtrackTracksListItem key={index} track={track} index={index} isEditing={isEditing} changeTrackText={changeTrackText} />
				  ))
				: substory?.data?.soundtrack?.tracks?.map((track, index) => (
						<SoundtrackTracksListItem key={index} track={track} index={index} isEditing={false} changeTrackText={changeTrackText} />
				  ))}
		</div>
	);
};
