// Packages

// Components
import { RegisterProfilePictureInput } from "./RegisterProfilePictureInput";
import { TextInput } from "../../components/TextInput/TextInput";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { SubmitBtn } from "../../components/SubmitBtn/SubmitBtn";

// Logic
import { RegisterLogic } from "./RegisterLogic";

// Context

// Services

// Styles
import "./Register.css";

// Assets

export const Register = () => {
	const {
		profilePictureInputRef,
		profilePicture,
		changeProfilePicture,
		username,
		changeUsername,
		nickname,
		changeNickname,
		email,
		changeEmail,
		password,
		changePassword,
		errors,
		submitNewUser,
	} = RegisterLogic();

	return (
		<div className='register'>
			<div className='register-form'>
				<div className='register-form-title'>Register an Account</div>

				<RegisterProfilePictureInput
					profilePictureInputRef={profilePictureInputRef}
					profilePicture={profilePicture}
					changeProfilePicture={changeProfilePicture}
				/>
				<ErrorMessage errors={errors} attribute='profilePicture' />

				<div className='register-form-text-input-container'>
					<TextInput label='Username' value={username} onChange={changeUsername} isDark={true} />
					<ErrorMessage errors={errors} attribute='username' />
				</div>
				<div className='register-form-text-input-container'>
					<TextInput label='Nickname' value={nickname} onChange={changeNickname} isDark={true} />
					<ErrorMessage errors={errors} attribute='nickname' />
				</div>
				<div className='register-form-text-input-container'>
					<TextInput label='Email Address' value={email} onChange={changeEmail} isDark={true} />
					<ErrorMessage errors={errors} attribute='email' />
				</div>
				<div className='register-form-text-input-container'>
					<TextInput label='Password' value={password} onChange={changePassword} hideValue={true} isDark={true} />
					<ErrorMessage errors={errors} attribute='password' />
				</div>

				<div className='register-form-submit-container'>
					<SubmitBtn label='Register Account' onSubmit={submitNewUser} />
				</div>
			</div>
		</div>
	);
};
