// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { Text } from "../../../components/Text/Text";
import { MultiLineTextInput } from "../../../components/MultiLineTextInput/MultiLineTextInput";

// Logic
import { StoryDescriptionLogic } from "./StoryDescriptionLogic";

// Context

// Services

// Styles
import "./StoryDescription.css";

// Assets

export const StoryDescription = () => {
	const { isAuthorizedToEdit, story, changeStoryDescription, revertStoryDescription, saveStoryDescription } = StoryDescriptionLogic();

	if (story?.data?.description)
		return (
			<div className='story-description'>
				<div className='story-description-title'>Description</div>
				<EditableContainer
					className='characters-story-description-container'
					isAuthorizedToEdit={isAuthorizedToEdit}
					onRevert={revertStoryDescription}
					onSave={saveStoryDescription}
				>
					<div>{!story?.data?.description ? null : <Text value={story.data.description} />}</div>
					<MultiLineTextInput
						label='Description'
						value={story.data.description.join("\n")}
						onChange={changeStoryDescription}
						seamless={true}
					/>
				</EditableContainer>
			</div>
		);
};
