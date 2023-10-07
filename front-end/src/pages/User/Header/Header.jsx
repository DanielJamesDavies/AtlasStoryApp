// Packages

// Components
import { ProfilePicture } from "./ProfilePicture/ProfilePicture";
import { Names } from "./Names/Names";
import { Followers } from "./Followers/Followers";
import { Buttons } from "./Buttons/Buttons";

// Logic

// Context

// Services

// Styles
import "./Header.css";

// Assets

export const Header = () => {
	return (
		<div className='user-header'>
			<ProfilePicture />
			<Names />
			<Followers />
			<Buttons />
			<div className='user-header-background' />
		</div>
	);
};
