// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./SoundtrackOpenPlaylistSelectorBtn.css";

// Assets

export const SoundtrackOpenPlaylistSelectorBtn = ({ showPlaylistSelector }) => {
	return (
		<button className='substory-subpage-soundtrack-open-playlist-selector-btn' onClick={showPlaylistSelector}>
			Change Spotify Playlist
		</button>
	);
};
