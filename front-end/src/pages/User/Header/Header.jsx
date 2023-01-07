// Packages

// Components
import { ProfilePicture } from "./ProfilePicture/ProfilePicture";
import { Names } from "./Names/Names";
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
			<Buttons />
			<div className='user-header-background' />
		</div>
	);
};
