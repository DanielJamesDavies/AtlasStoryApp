// Packages

// Components
import { LocationTitle } from "./Title/Title";
import { LocationName } from "./Name/Name";
import { LocationType } from "./Type/Type";

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
			<LocationType />
		</div>
	);
};
