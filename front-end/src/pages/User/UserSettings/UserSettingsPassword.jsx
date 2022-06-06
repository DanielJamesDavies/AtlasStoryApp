// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

// Logic
import { UserSettingsPasswordLogic } from "./UserSettingsPasswordLogic";

// Context

// Services

// Styles
import "./UserSettings.css";

// Assets

export const UserSettingsPassword = () => {
	const { isAuthorizedToEdit, password, changePassword, savePassword, errors } = UserSettingsPasswordLogic();

	return (
		<>
			<EditableContainer className='user-settings-input-container' isAuthorizedToEdit={isAuthorizedToEdit} onSave={savePassword}>
				<div className='user-settings-input-value'>Password Hidden</div>
				<TextInput
					label='New Password'
					className='user-settings-input-value'
					seamless={true}
					hideValue={true}
					value={password}
					onChange={changePassword}
				/>
			</EditableContainer>
			<ErrorMessage errors={errors} attribute='password' />
			<ErrorMessage errors={errors} />
		</>
	);
};
