// Packages

// Components
import { TextInput } from "../../components/TextInput/TextInput";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { LoadingCircle } from "../../components/LoadingCircle/LoadingCircle";
import { SubmitBtn } from "../../components/SubmitBtn/SubmitBtn";

// Logic
import { LoginLogic } from "./LoginLogic";

// Context

// Services

// Styles
import "./Login.css";

// Assets

export const Login = () => {
	const { username, changeUsername, password, changePassword, forgotPassword, isLoggingIn, errors, submitLoginUser } = LoginLogic();

	return (
		<div className='login'>
			<div className='login-form'>
				<div className='login-form-title'>Log In</div>

				<div className='login-form-text-input-container'>
					<TextInput label='Username' value={username} onChange={changeUsername} isDark={true} onKeyEnter={submitLoginUser} />
					<ErrorMessage errors={errors} attribute='username' />
				</div>
				<div className='login-form-text-input-container'>
					<TextInput
						label='Password'
						type='password'
						value={password}
						onChange={changePassword}
						hideValue={true}
						isDark={true}
						onKeyEnter={submitLoginUser}
					/>
					<ErrorMessage errors={errors} attribute='password' />
				</div>
				<ErrorMessage errors={errors} />

				<div className='login-form-forgot-password-container'>
					<div className='login-form-forgot-password' onClick={forgotPassword}>
						Forgot Password
					</div>
				</div>

				<div className='login-form-submit-container'>
					{!isLoggingIn ? null : <LoadingCircle className='login-form-submit-loading-circle-container' size='s' />}
					<SubmitBtn label='Login' onSubmit={submitLoginUser} />
				</div>
			</div>
		</div>
	);
};
