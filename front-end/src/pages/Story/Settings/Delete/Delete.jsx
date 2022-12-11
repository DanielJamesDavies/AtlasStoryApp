// Packages

// Components
import { ConfirmDelete } from "../../../../components/ConfirmDelete/ConfirmDelete";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { DeleteLogic } from "./DeleteLogic";

// Context

// Services

// Styles
import "./Delete.css";

// Assets

export const Delete = () => {
	const { isAuthorizedToEdit, isDisplayingSettings, errors, deleteStory } = DeleteLogic();

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
