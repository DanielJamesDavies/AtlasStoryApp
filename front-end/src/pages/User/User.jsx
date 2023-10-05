// Packages

// Components

// Logic
import { Banner } from "./Banner/Banner";
import { Header } from "./Header/Header";
import { BlockedMessage } from "./BlockedMessage/BlockedMessage";
import { Stories } from "./Stories/Stories";
import { Settings } from "./Settings/Settings";

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
			<BlockedMessage />
			<Stories />
			<Settings />
		</div>
	);
};
