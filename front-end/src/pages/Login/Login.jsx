// Packages
import { FaCheck } from "react-icons/fa";

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
	const {
		username,
		changeUsername,
		password,
		changePassword,
		isLoggingIn,
		errors,
		submitLoginUser,
		hasForgotPassword,
		forgotPassword,
		hasForgotPasswordEmailSent,
		email,
		changeEmail,
		submitForgotPasswordRequest,
	} = LoginLogic();

	return (
		<div className='login'>
			{!hasForgotPassword ? (
				<div className='login-form'>
					<div className='login-form-title'>Log In</div>

					<div className='login-form-text-input-container'>
						<TextInput label='Username' value={username} onChange={changeUsername} isDark={true} />
						<ErrorMessage errors={errors} attribute='username' />
					</div>
					<div className='login-form-text-input-container'>
						<TextInput label='Password' value={password} onChange={changePassword} hideValue={true} isDark={true} />
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
						<SubmitBtn label='Log in to Your Account' onSubmit={submitLoginUser} />
					</div>
				</div>
			) : (
				<div className='login-form'>
					{!hasForgotPasswordEmailSent ? (
						<>
							<div className='login-form-title'>Forgot Password</div>

							<div className='login-form-text-input-container'>
								<TextInput label='Email' value={email} onChange={changeEmail} isDark={true} />
								<ErrorMessage errors={errors} attribute='email' />
							</div>
							<ErrorMessage errors={errors} />

							<div className='login-form-submit-container'>
								<SubmitBtn label='Send Link to Change Password to Email' onSubmit={submitForgotPasswordRequest} />
							</div>
						</>
					) : (
						<div className='login-form-forgot-password-success-container'>
							<div className='login-form-forgot-password-success-icon'>
								<FaCheck />
							</div>
							<div className='login-form-forgot-password-success-text'>
								An email has successfully been sent to your email address with a link to change your password.
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
