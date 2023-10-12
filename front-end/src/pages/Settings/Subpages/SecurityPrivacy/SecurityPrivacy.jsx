// Packages

// Components
import { IsPrivate } from "./IsPrivate/IsPrivate";
import { Password } from "./Password/Password";

// Logic

// Context

// Services

// Styles

// Assets

export const SecurityPrivacy = () => {
	return (
		<div className='settings-subpage'>
			<IsPrivate />
			<Password />
		</div>
	);
};
