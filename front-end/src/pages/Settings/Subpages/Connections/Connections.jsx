// Packages

// Components
import { ConnectToSpotify } from "./ConnectToSpotify/ConnectToSpotify";
import { AI } from "./AI/AI";

// Logic

// Context

// Services

// Styles

// Assets

export const Connections = () => {
	return (
		<div className='settings-subpage'>
			<ConnectToSpotify />
			<AI />
		</div>
	);
};
