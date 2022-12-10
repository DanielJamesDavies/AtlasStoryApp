// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { PasswordLogic } from "./PasswordLogic";

// Context

// Services

// Styles

// Assets

export const Password = () => {
	const { isAuthorizedToEdit, password, changePassword, savePassword, errors } = PasswordLogic();

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
