// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { UserSettingsUsernameLogic } from "./UserSettingsUsernameLogic";

// Context

// Services

// Styles

// Assets

export const UserSettingsUsername = () => {
	const { isAuthorizedToEdit, username, errors, changeUsername, revertUsername, saveUsername } = UserSettingsUsernameLogic();

	return (
		<>
			<EditableContainer
				className='user-settings-input-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRevert={revertUsername}
				onSave={saveUsername}
			>
				<div className='user-settings-input-value'>{username}</div>
				<div>
					<TextInput className='user-settings-input-value' seamless={true} value={username} onChange={changeUsername} />
					<ErrorMessage errors={errors} />
				</div>
			</EditableContainer>
		</>
	);
};
