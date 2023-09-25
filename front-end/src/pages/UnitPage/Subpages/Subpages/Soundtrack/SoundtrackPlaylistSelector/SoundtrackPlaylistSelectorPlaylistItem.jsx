// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./SoundtrackPlaylistSelectorPlaylistItem.css";

// Assets

export const SoundtrackPlaylistSelectorPlaylistItem = ({ playlist, selectPlaylist }) => {
	return (
		<div tabIndex='1' className='unit-page-subpage-soundtrack-playlist-selector-playlist-item' onClick={() => selectPlaylist(playlist?.id)}>
			<div className='unit-page-subpage-soundtrack-playlist-selector-playlist-item-photo'>
				{!playlist?.photo ? null : <img src={playlist.photo} alt='' />}
			</div>
			<div className='unit-page-subpage-soundtrack-playlist-selector-playlist-item-name'>{playlist?.name}</div>
		</div>
	);
};
