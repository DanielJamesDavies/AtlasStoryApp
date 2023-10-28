// Packages

// Components

// Logic
import { LocationTypeLogic } from "./LocationTypeLogic";

// Context

// Services

// Styles
import "./LocationType.css";

// Assets

export const LocationType = () => {
	const { unit, location_types_icons, location_types_names } = LocationTypeLogic();

	return (
		<div className='unit-page-primary-location-type-container'>
			<div className='unit-page-primary-location-type-icon'>{location_types_icons[unit?.type]}</div>
			<div className='unit-page-primary-location-type-text'>{location_types_names[unit?.type]}</div>
		</div>
	);
};
