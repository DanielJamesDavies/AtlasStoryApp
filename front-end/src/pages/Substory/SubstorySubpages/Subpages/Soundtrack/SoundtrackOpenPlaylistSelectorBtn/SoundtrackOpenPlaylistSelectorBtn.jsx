// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./SoundtrackOpenPlaylistSelectorBtn.css";

// Assets

export const SoundtrackOpenPlaylistSelectorBtn = ({ substory, showPlaylistSelector }) => {
	return (
		<div className='substory-subpage-soundtrack-open-playlist-selector-btn-container'>
			<button className='substory-subpage-soundtrack-open-playlist-selector-btn' onClick={showPlaylistSelector}>
				{substory?.data?.soundtrack?.playlist_id ? "Change Spotify Playlist" : "Link Spotify Playlist"}
			</button>
		</div>
	);
};
