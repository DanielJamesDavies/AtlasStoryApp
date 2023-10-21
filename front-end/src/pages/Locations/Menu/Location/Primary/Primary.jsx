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

export const LocationPrimary = ({ locationPrimaryRef }) => {
	return (
		<div ref={locationPrimaryRef} className='locations-location-primary'>
			<LocationTitle />
			<LocationName />
		</div>
	);
};
