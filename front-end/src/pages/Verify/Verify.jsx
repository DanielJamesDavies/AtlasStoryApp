// Packages
import { FaCheck } from "react-icons/fa";

// Components
import { LoadingCircle } from "../../components/LoadingCircle/LoadingCircle";

// Logic
import { VerifyLogic } from "./VerifyLogic";

// Context

// Services

// Styles
import "./Verify.css";

// Assets

export const Verify = ({ username, verificationCode }) => {
	const { hasVerified, errors } = VerifyLogic({ username, verificationCode });

	return (
		<div className='verify'>
			{hasVerified ? (
				<div className='verify-message'>
					<div className='verify-message-icon'>
						<FaCheck />
					</div>
					<div className='verify-message-title'>Your Account Has Been Verified</div>
				</div>
			) : errors.length === 0 ? (
				<div className='verify-message verify-message-flex'>
					<LoadingCircle className='verify-message-loading-circle-container' />
					<div className='verify-message-title'>Verifying your Account</div>
				</div>
			) : (
				<div className='verify-message'>
					<div className='verify-message-title'>Error in Verifying Account</div>
					{errors.map((error, index) => (
						<div key={index} className='verify-message-error'>
							{error?.message}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
