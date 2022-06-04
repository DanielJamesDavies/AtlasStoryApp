// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { ImageInput } from "../../../components/ImageInput/ImageInput";

// Logic
import { StoryPrimaryIconLogic } from "./StoryPrimaryIconLogic";

// Context

// Services

// Styles
import "./StoryPrimaryIcon.css";

// Assets

export const StoryPrimaryIcon = () => {
	const { isAuthorizedToEdit, icon, changeStoryIcon, revertStoryIcon, saveStoryIcon } = StoryPrimaryIconLogic();

	return (
		<EditableContainer
			className='story-primary-icon-container'
			isMediaContent={true}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertStoryIcon}
			onSave={saveStoryIcon}
		>
			<div className='story-primary-icon'>{!icon ? null : <img src={icon} alt='' />}</div>
			<ImageInput className='story-primary-icon' isCircular={true} value={icon} onChange={changeStoryIcon} />
		</EditableContainer>
	);
};
