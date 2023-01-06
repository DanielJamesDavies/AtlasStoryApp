// Packages
import { FaCheck } from "react-icons/fa";

// Components
import { TextInput } from "../../components/TextInput/TextInput";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { SubmitBtn } from "../../components/SubmitBtn/SubmitBtn";

// Logic
import { ForgotPasswordLogic } from "./ForgotPasswordLogic";

// Context

// Services

// Styles
import "./ForgotPassword.css";

// Assets

export const ForgotPassword = () => {
	const { errors, hasForgotPasswordEmailSent, email, changeEmail, submitForgotPasswordRequest } = ForgotPasswordLogic();

	return (
		<div className='forgot-password'>
			<div className='forgot-password-form'>
				{!hasForgotPasswordEmailSent ? (
					<>
						<div className='forgot-password-form-title'>Forgot Password</div>

						<div className='forgot-password-form-text-input-container'>
							<TextInput label='Email' value={email} onChange={changeEmail} isDark={true} onKeyEnter={submitForgotPasswordRequest} />
							<ErrorMessage errors={errors} attribute='email' />
						</div>
						<ErrorMessage errors={errors} />

						<div className='forgot-password-form-submit-container'>
							<SubmitBtn label='Continue' onSubmit={submitForgotPasswordRequest} />
						</div>
					</>
				) : (
					<div className='forgot-password-form-forgot-password-success-container'>
						<div className='forgot-password-form-forgot-password-success-icon'>
							<FaCheck />
						</div>
						<div className='forgot-password-form-forgot-password-success-text'>
							An email has successfully been sent to your email address with a link to change your password.
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
