// Packages

// Components

// Logic
import { UserPrimary } from "./UserPrimary/UserPrimary";
import { UserStories } from "./UserStories/UserStories";
import { UserSettings } from "./UserSettings/UserSettings";

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
			<UserSettings />
		</div>
	);
};
