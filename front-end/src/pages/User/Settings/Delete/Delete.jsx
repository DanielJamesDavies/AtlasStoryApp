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
	const { isAuthorizedToEdit, isDisplayingSettings, errors, deleteUser } = DeleteLogic();

	return (
		<>
			<ConfirmDelete
				state={isDisplayingSettings}
				className='user-settings-confirm-delete'
				seamless={true}
				labelContext='your account'
				onDelete={deleteUser}
				isAuthorizedToEdit={isAuthorizedToEdit}
			/>
			<ErrorMessage errors={errors} />
		</>
	);
};
