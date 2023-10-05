// Packages

// Components

// Logic
import { BlockedMessageLogic } from "./BlockedMessageLogic";

// Context

// Services

// Styles
import "./BlockedMessage.css";

// Assets

export const BlockedMessage = () => {
	const { user_username, hasBeenBlockedByUser } = BlockedMessageLogic();

	if (!hasBeenBlockedByUser) return null;
	return <div className='user-blocked-message'>You have been blocked by @{user_username}.</div>;
};
