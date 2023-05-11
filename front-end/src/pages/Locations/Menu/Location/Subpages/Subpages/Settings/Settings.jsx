// Packages

// Components
import { LocationPosition } from "./Position/Position";
import { LocationRotation } from "./Rotation/Rotation";
import { LocationPaths } from "./Paths/Paths";

// Logic

// Context

// Services

// Styles
import "./Settings.css";

// Assets

export const Settings = () => {
	return (
		<div className='locations-location-subpage-settings'>
			<LocationPosition />
			<LocationRotation />
			<LocationPaths />
		</div>
	);
};
