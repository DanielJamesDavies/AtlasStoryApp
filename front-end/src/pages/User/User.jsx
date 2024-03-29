// Packages

// Components

// Logic
import { Banner } from "./Banner/Banner";
import { Header } from "./Header/Header";
import { PrivateUserMessage } from "./PrivateUserMessage/PrivateUserMessage";
import { BlockedMessage } from "./BlockedMessage/BlockedMessage";
import { Stories } from "./Stories/Stories";
import { FollowersMenu } from "./FollowersMenu/FollowersMenu";

// Context

// Services

// Styles
import "./User.css";

// Assets

export const User = () => {
	return (
		<div className='user'>
			<Banner />
			<Header />
			<PrivateUserMessage />
			<BlockedMessage />
			<Stories />
			<FollowersMenu />
		</div>
	);
};
