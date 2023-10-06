// Packages
import { FaUserClock } from "react-icons/fa";

// Components

// Logic
import { PrivateUserMessageLogic } from "./PrivateUserMessageLogic";

// Context

// Services

// Styles
import "./PrivateUserMessage.css";

// Assets

export const PrivateUserMessage = () => {
	const { user_username, isUserPrivate, hasSentFollowRequest, sendFollowRequest } = PrivateUserMessageLogic();

	if (!isUserPrivate) return null;
	return (
		<div className='user-private-message-container'>
			<div className='user-private-message'>This is a private account. Follow @{user_username} to view their profile.</div>
			{hasSentFollowRequest ? (
				<div className='user-private-follow-request-sent'>
					<FaUserClock />
					<div>Follow Request Sent</div>
				</div>
			) : (
				<button className='user-private-follow-btn' onClick={sendFollowRequest}>
					Send Follow Request
				</button>
			)}
		</div>
	);
};
