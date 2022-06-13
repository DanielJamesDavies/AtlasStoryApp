// Packages

// Components
import { ConfirmDelete } from "../../../../components/ConfirmDelete/ConfirmDelete";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { StorySettingsDeleteLogic } from "./StorySettingsDeleteLogic";

// Context

// Services

// Styles
import "./StorySettingsDelete.css";

// Assets

export const StorySettingsDelete = () => {
	const { isAuthorizedToEdit, isDisplayingSettings, errors, deleteStory } = StorySettingsDeleteLogic();

	return (
		<>
			<ConfirmDelete
				state={isDisplayingSettings}
				className='story-settings-confirm-delete'
				seamless={true}
				labelContext='your story'
				onDelete={deleteStory}
				isAuthorizedToEdit={isAuthorizedToEdit}
			/>
			<ErrorMessage errors={errors} />
		</>
	);
};
