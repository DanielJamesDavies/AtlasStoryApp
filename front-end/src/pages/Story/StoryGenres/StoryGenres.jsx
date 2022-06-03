// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
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

	if (story?.data?.genres)
		return (
			<div className='story-genres'>
				<div className='story-genres-label'>Genres</div>

				<EditableContainer
					className='story-genres-value-container'
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
			</div>
		);
};
