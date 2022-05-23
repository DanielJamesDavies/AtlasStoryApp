// Packages

// Components

// Logic
import { UserLogic } from "./UserLogic";

// Context

// Services

// Styles

// Assets

export const User = ({ user_id }) => {
	const { user } = UserLogic({ user_id });

	return <div className='user'>{user?.username}</div>;
};
