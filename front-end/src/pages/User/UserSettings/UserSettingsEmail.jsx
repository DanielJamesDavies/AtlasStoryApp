// Packages

// Components
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

// Logic
import { UserSettingsEmailLogic } from "./UserSettingsEmailLogic";

// Context

// Services

// Styles
import "./UserSettings.css";

// Assets

export const UserSettingsEmail = () => {
	const { isAuthorizedToEdit, user, changeEmail, revertEmail, saveEmail, errors, hasSentEmailVerification } = UserSettingsEmailLogic();

	return (
		<>
			<EditableContainer
				className='user-settings-input-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRevert={revertEmail}
				onSave={saveEmail}
			>
				<div className='user-settings-input-value'>{user.email}</div>
				<TextInput className='user-settings-input-value' seamless={true} value={user.email} onChange={changeEmail} />
			</EditableContainer>
			<ErrorMessage errors={errors} attribute='email' />
			{!hasSentEmailVerification ? null : (
				<div className='user-settings-email-message'>
					To complete these changes, please verify your account by following the steps on the verification email sent to the new email
					address.
				</div>
			)}
		</>
	);
};
