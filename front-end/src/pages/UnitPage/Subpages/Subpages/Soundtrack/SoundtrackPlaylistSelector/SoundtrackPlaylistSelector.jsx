// Packages

// Components
import { PopUpContainer } from "../../../../../../components/PopUpContainer/PopUpContainer";
import { LoadingCircle } from "../../../../../../components/LoadingCircle/LoadingCircle";
import { SoundtrackPlaylistSelectorPlaylistItem } from "./SoundtrackPlaylistSelectorPlaylistItem";

// Logic
import { SoundtrackPlaylistSelectorLogic } from "./SoundtrackPlaylistSelectorLogic";

// Context

// Services

// Styles
import "./SoundtrackPlaylistSelector.css";

// Assets

export const SoundtrackPlaylistSelector = ({ isDisplayingPlaylistSelector, hidePlaylistSelector }) => {
	const { playlists, selectPlaylist } = SoundtrackPlaylistSelectorLogic({
		isDisplayingPlaylistSelector,
	});

	return (
		<PopUpContainer
			className='unit-page-subpage-soundtrack-playlist-selector-container'
			title='Change Spotify Playlist'
			isDisplaying={isDisplayingPlaylistSelector}
			onClosePopUp={hidePlaylistSelector}
		>
			<div className='unit-page-subpage-soundtrack-playlist-selector-form'>
				<div className='unit-page-subpage-soundtrack-playlist-selector-subtitle'>
					Please Select a Spotify Playlist for This Unit's Soundtrack:
				</div>
				{playlists === false ? (
					<div className='unit-page-subpage-soundtrack-playlist-selector-loading-circle-container'>
						<LoadingCircle />
					</div>
				) : (
					<div className='unit-page-subpage-soundtrack-playlist-selector-playlist-items'>
						{playlists?.map((playlist, index) => (
							<SoundtrackPlaylistSelectorPlaylistItem key={index} playlist={playlist} selectPlaylist={selectPlaylist} />
						))}
					</div>
				)}
			</div>
		</PopUpContainer>
	);
};
