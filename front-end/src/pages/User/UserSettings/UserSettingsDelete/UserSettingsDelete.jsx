// Packages

// Components
import { ConfirmDelete } from "../../../../components/ConfirmDelete/ConfirmDelete";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { UserSettingsDeleteLogic } from "./UserSettingsDeleteLogic";

// Context

// Services

// Styles
import "./UserSettingsDelete.css";

// Assets

export const UserSettingsDelete = () => {
	const { isAuthorizedToEdit, isDisplayingSettings, errors, deleteUser } = UserSettingsDeleteLogic();

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
