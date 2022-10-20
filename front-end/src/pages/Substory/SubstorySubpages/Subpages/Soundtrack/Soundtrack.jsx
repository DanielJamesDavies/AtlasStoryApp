// Packages

// Components
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
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
	const { isAuthorizedToEdit, revertSoundtrack, saveSoundtrack, soundtrackRef, onSoundtrackContainerScroll } = SoundtrackLogic();

	return (
		<EditableContainer
			className='substory-subpage-soundtrack-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertSoundtrack}
			onSave={saveSoundtrack}
			onScroll={onSoundtrackContainerScroll}
		>
			<div ref={soundtrackRef} className='substory-subpage-soundtrack'>
				<SoundtrackTracksList isEditing={false} />
				<SoundtrackRemovedTracksList isEditing={false} />
			</div>
			<div ref={soundtrackRef} className='substory-subpage-soundtrack'>
				<SoundtrackTracksList isEditing={true} />
				<SoundtrackRemovedTracksList isEditing={true} />
			</div>
		</EditableContainer>
	);
};
