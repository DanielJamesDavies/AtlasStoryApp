// Packages

// Components
import { LocationTitle } from "./Title/Title";
import { LocationName } from "./Name/Name";

// Logic

// Context

// Services

// Styles
import "./Primary.css";

// Assets

export const LocationPrimary = () => {
	return (
		<div className='locations-location-primary'>
			<LocationTitle />
			<LocationName />
		</div>
	);
};
