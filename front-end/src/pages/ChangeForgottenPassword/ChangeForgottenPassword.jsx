// Packages
import { FaCheck } from "react-icons/fa";

// Components
import { TextInput } from "../../components/TextInput/TextInput";
import { SubmitBtn } from "../../components/SubmitBtn/SubmitBtn";

// Logic
import { ChangeForgottenPasswordLogic } from "./ChangeForgottenPasswordLogic";

// Context

// Services

// Styles
import "./ChangeForgottenPassword.css";

// Assets

export const ChangeForgottenPassword = ({ username, email, verificationCode }) => {
	const { hasChanged, errors, password, changePassword, submitNewPassword } = ChangeForgottenPasswordLogic({ username, email, verificationCode });

	return (
		<div className='change-forgotten-password'>
			{hasChanged ? (
				<div className='change-forgotten-password-message'>
					<div className='change-forgotten-password-message-icon'>
						<FaCheck />
					</div>
					<div className='change-forgotten-password-message-title'>Your Password Has Been Changed</div>
				</div>
			) : errors.length === 0 ? (
				<div className='change-forgotten-password-message'>
					<div className='change-forgotten-password-message-title'>Change Forgotten Password</div>
					<div className='change-forgotten-password-message-input'>
						<TextInput
							value={password}
							onChange={changePassword}
							label='New Password'
							hideValue={true}
							onKeyEnter={submitNewPassword}
						/>
					</div>
					<div>
						<SubmitBtn label='Change Password' onSubmit={submitNewPassword} />
					</div>
				</div>
			) : (
				<div className='change-forgotten-password-message'>
					<div className='change-forgotten-password-message-title'>Error in Changing Password</div>
					{errors.map((error, index) => (
						<div key={index} className='change-forgotten-password-message-error'>
							{error?.message}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
