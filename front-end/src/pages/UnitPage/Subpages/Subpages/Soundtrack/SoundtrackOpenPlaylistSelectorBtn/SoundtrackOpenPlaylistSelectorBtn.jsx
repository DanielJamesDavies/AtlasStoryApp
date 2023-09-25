// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./SoundtrackOpenPlaylistSelectorBtn.css";

// Assets

export const SoundtrackOpenPlaylistSelectorBtn = ({ unit, showPlaylistSelector }) => {
	return (
		<div className='unit-page-subpage-soundtrack-open-playlist-selector-btn-container'>
			<button className='unit-page-subpage-soundtrack-open-playlist-selector-btn' onClick={showPlaylistSelector}>
				{unit?.data?.soundtrack?.playlist_id ? "Change Spotify Playlist" : "Link Spotify Playlist"}
			</button>
		</div>
	);
};
