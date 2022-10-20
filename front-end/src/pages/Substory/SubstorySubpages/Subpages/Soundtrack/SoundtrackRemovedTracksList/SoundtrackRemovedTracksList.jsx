// Packages

// Components
import { SoundtrackRemovedTracksListItem } from "./SoundtrackRemovedTracksListItem";

// Logic
import { SoundtrackRemovedTracksListLogic } from "./SoundtrackRemovedTracksListLogic";

// Context

// Services

// Styles
import "./SoundtrackRemovedTracksList.css";

// Assets

export const SoundtrackRemovedTracksList = ({ isEditing }) => {
	const { substory, substorySoundtrack, changeTrackText, deleteTrack } = SoundtrackRemovedTracksListLogic();

	return (
		<div className='substory-subpage-soundtrack-removed-tracks-list'>
			{substory?.data?.soundtrack?.tracks.filter((e) => substorySoundtrack?.tracks?.findIndex((e2) => e2.uri === e.uri) === -1).length ===
			0 ? null : (
				<div className='substory-subpage-soundtrack-removed-tracks-list-title'>Removed Tracks</div>
			)}
			{substory?.data?.soundtrack?.tracks
				.filter((e) => substorySoundtrack?.tracks?.findIndex((e2) => e2.uri === e.uri) === -1)
				?.map((track, index) => (
					<SoundtrackRemovedTracksListItem
						key={index}
						track={track}
						isEditing={isEditing}
						changeTrackText={changeTrackText}
						deleteTrack={deleteTrack}
					/>
				))}
		</div>
	);
};
