// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../components/TextInput/TextInput";

// Logic
import { UserSettingsUsernameLogic } from "./UserSettingsUsernameLogic";

// Context

// Services

// Styles
import "./UserSettings.css";

// Assets

export const UserSettingsUsername = () => {
	const { isAuthorizedToEdit, username, changeUsername, revertUsername, saveUsername } = UserSettingsUsernameLogic();

	return (
		<EditableContainer
			className='user-settings-input-container'
			isMediaContent={true}
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertUsername}
			onSave={saveUsername}
		>
			<div className='user-settings-input-value'>{username}</div>
			<TextInput className='user-settings-input-value' seamless={true} value={username} onChange={changeUsername} />
		</EditableContainer>
	);
};
