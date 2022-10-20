// Packages

// Components
import { ContentItem } from "../../../components/ContentItem/ContentItem";
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../components/LabelContainer/LabelContainer";
import { TextInput } from "../../../components/TextInput/TextInput";

// Logic
import { StoryGenresLogic } from "./StoryGenresLogic";

// Context

// Services

// Styles
import "./StoryGenres.css";

// Assets

export const StoryGenres = () => {
	const { isAuthorizedToEdit, story, changeStoryGenres, revertStoryGenres, saveStoryGenres } = StoryGenresLogic();

	if (!story?.data?.genres)
		return (
			<ContentItem size='s'>
				<LabelContainer label='Genres' isInline={true}></LabelContainer>
			</ContentItem>
		);
	return (
		<ContentItem size='s'>
			<LabelContainer label='Genres' isInline={true}>
				<EditableContainer
					className='story-genres-value-container'
					absolutePositionEditBtns={true}
					isAuthorizedToEdit={isAuthorizedToEdit}
					onRevert={revertStoryGenres}
					onSave={saveStoryGenres}
				>
					<div className='story-genres-value'>{story.data.genres}</div>
					<TextInput
						className='story-genres-value'
						label='Genres'
						value={story.data.genres}
						onChange={changeStoryGenres}
						seamless={true}
					/>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
