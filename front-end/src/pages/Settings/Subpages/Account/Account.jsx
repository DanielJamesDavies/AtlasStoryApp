// Packages

// Components
import { Username } from "./Username/Username";
import { Email } from "./Email/Email";
import { Delete } from "./Delete/Delete";

// Logic

// Context

// Services

// Styles

// Assets

export const Account = () => {
	return (
		<div className='settings-subpage'>
			<Username />
			<Email />
			<Delete />
		</div>
	);
};
