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
	const { unit, unitSoundtrack, changeTrackText, deleteTrack } = SoundtrackRemovedTracksListLogic();

	return (
		<div className='unit-page-subpage-soundtrack-removed-tracks-list'>
			{unit?.data?.soundtrack?.tracks.filter((e) => unitSoundtrack?.tracks?.findIndex((e2) => e2.uri === e.uri) === -1).length ===
			0 ? null : (
				<div className='unit-page-subpage-soundtrack-removed-tracks-list-title'>Removed Tracks</div>
			)}
			{unit?.data?.soundtrack?.tracks
				.filter((e) => unitSoundtrack?.tracks?.findIndex((e2) => e2.uri === e.uri) === -1)
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
