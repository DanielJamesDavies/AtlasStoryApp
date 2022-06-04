// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../components/TextInput/TextInput";

// Logic
import { StoryPrimaryTitleLogic } from "./StoryPrimaryTitleLogic";

// Context

// Services

// Styles

// Assets

export const StoryPrimaryTitle = () => {
	const { isAuthorizedToEdit, story, changeStoryTitle, revertStoryTitle, saveStoryTitle } = StoryPrimaryTitleLogic();

	return (
		<EditableContainer
			className='story-primary-main-info-title-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertStoryTitle}
			onSave={saveStoryTitle}
		>
			<div className='story-primary-main-info-title'>{story?.data?.title}</div>
			<TextInput
				className='story-primary-main-info-title'
				seamless={true}
				value={story?.data?.title}
				onChange={changeStoryTitle}
				autoResize={true}
			/>
		</EditableContainer>
	);
};
