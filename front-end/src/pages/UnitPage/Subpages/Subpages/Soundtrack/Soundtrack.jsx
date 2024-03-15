// Packages

// Components
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { SoundtrackOpenPlaylistSelectorBtn } from "./SoundtrackOpenPlaylistSelectorBtn/SoundtrackOpenPlaylistSelectorBtn";
import { SoundtrackPlaylistSelector } from "./SoundtrackPlaylistSelector/SoundtrackPlaylistSelector";
import { SoundtrackTracksList } from "./SoundtrackTracksList/SoundtrackTracksList";
import { SoundtrackRemovedTracksList } from "./SoundtrackRemovedTracksList/SoundtrackRemovedTracksList";

// Logic
import { SoundtrackLogic } from "./SoundtrackLogic";

// Context

// Services

// Styles
import "./Soundtrack.css";

// Assets

export const Soundtrack = () => {
	const {
		isAuthorizedToEdit,
		unit,
		revertSoundtrack,
		saveSoundtrack,
		soundtrackRef,
		onSoundtrackContainerScroll,
		isDisplayingPlaylistSelector,
		showPlaylistSelector,
		hidePlaylistSelector,
		spotify_refresh_token,
	} = SoundtrackLogic();

	return (
		<EditableContainer
			className='unit-page-subpage unit-page-subpage-soundtrack-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertSoundtrack}
			onSave={saveSoundtrack}
			onScroll={onSoundtrackContainerScroll}
			scrollItemsDepth={1}
		>
			<div ref={soundtrackRef} className='unit-page-subpage-soundtrack'>
				<SoundtrackTracksList isEditing={false} />
				<SoundtrackRemovedTracksList isEditing={false} />
			</div>
			<div ref={soundtrackRef} className='unit-page-subpage-soundtrack'>
				{!spotify_refresh_token ? null : (
					<>
						<SoundtrackOpenPlaylistSelectorBtn unit={unit} showPlaylistSelector={showPlaylistSelector} />
						<SoundtrackPlaylistSelector
							isDisplayingPlaylistSelector={isDisplayingPlaylistSelector}
							hidePlaylistSelector={hidePlaylistSelector}
						/>
					</>
				)}
				<SoundtrackTracksList isEditing={true} />
				<SoundtrackRemovedTracksList isEditing={true} />
			</div>
		</EditableContainer>
	);
};
