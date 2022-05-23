// Packages

// Components

// Logic
import { UserPrimary } from "./UserPrimary/UserPrimary";
import { UserStories } from "./UserStories/UserStories";

// Context

// Services

// Styles
import "./User.css";

// Assets

export const User = () => {
	return (
		<div className='user'>
			<UserPrimary />
			<UserStories />
		</div>
	);
};
