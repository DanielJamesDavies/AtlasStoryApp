// Packages

// Components
import { ContentItem } from "../../../../../components/ContentItem/ContentItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { EmailLogic } from "./EmailLogic";

// Context

// Services

// Styles
import "./Email.css";

// Assets

export const Email = () => {
	const { isAuthorizedToEdit, user, changeEmail, revertEmail, saveEmail, errors, hasSentEmailVerification } = EmailLogic();

	return (
		<ContentItem className='settings-item' size='s' hasBg={true}>
			<div className='settings-item-title'>Email</div>
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
			<ErrorMessage errors={errors} />
			{!hasSentEmailVerification ? null : (
				<div className='user-settings-email-message'>
					To complete these changes, please verify your account by following the steps on the verification email sent to the new email
					address.
				</div>
			)}
		</ContentItem>
	);
};
