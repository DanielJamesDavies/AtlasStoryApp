// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../components/LabelContainer/LabelContainer";
import { TextInput } from "../../../components/TextInput/TextInput";

// Logic
import { StoryGenresLogic } from "./StoryGenresLogic";

// Context

// Services

// Styles

// Assets

export const StoryGenres = () => {
	const { isAuthorizedToEdit, story, changeStoryGenres, revertStoryGenres, saveStoryGenres } = StoryGenresLogic();

	if (story?.data?.genres)
		return (
			<LabelContainer label='Genres' isInline={true}>
				<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onRevert={revertStoryGenres} onSave={saveStoryGenres}>
					<div>{story.data.genres}</div>
					<TextInput label='Genres' value={story.data.genres} onChange={changeStoryGenres} seamless={true} />
				</EditableContainer>
			</LabelContainer>
		);
};
