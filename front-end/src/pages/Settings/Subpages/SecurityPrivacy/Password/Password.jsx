// Packages

// Components
import { ContentItem } from "../../../../../components/ContentItem/ContentItem";
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { PasswordLogic } from "./PasswordLogic";

// Context

// Services

// Styles
import "./Password.css";

// Assets

export const Password = () => {
	const { isAuthorizedToEdit, password, changePassword, savePassword, errors } = PasswordLogic();

	return (
		<ContentItem className='settings-item settings-item-password-container' size='s' hasBg={true}>
			<div className='settings-item-title'>Password</div>
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
		</ContentItem>
	);
};
