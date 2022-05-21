// Packages

// Components

// Logic
import { UserLogic } from "./UserLogic";

// Context

// Services

// Styles

// Assets

export const User = () => {
	const { user } = UserLogic();

	return <div className='user'></div>;
};
