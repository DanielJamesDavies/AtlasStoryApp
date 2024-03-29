// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { ImageInput } from "../../../../components/ImageInput/ImageInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { IconLogic } from "./IconLogic";

// Context

// Services

// Styles
import "./Icon.css";

// Assets

export const Icon = () => {
	const { isAuthorizedToEdit, storyIcon, changeStoryIcon, revertStoryIcon, saveStoryIcon, onClickIcon, errors } = IconLogic();

	return (
		<EditableContainer
			className='story-header-icon-container'
			isMediaContent={true}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertStoryIcon}
			onSave={saveStoryIcon}
		>
			<div className='story-header-icon lightbox-openable-image' onClick={onClickIcon}>
				{!storyIcon ? <div className='story-header-icon-placeholder' /> : <img src={storyIcon} alt='' draggable={false} />}
			</div>
			<ImageInput className='story-header-icon' isCircular={true} value={storyIcon} onChange={changeStoryIcon} />
			<ErrorMessage errors={errors} />
		</EditableContainer>
	);
};
