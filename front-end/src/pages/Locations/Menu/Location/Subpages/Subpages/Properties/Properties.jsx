// Packages

// Components
import { LocationType } from "./Type/Type";
import { LocationScale } from "./Scale/Scale";
import { LocationTilt } from "./Tilt/Tilt";
import { LocationDayLength } from "./DayLength/DayLength";

// Logic

// Context

// Services

// Styles

// Assets

export const Properties = () => {
	return (
		<div className='locations-location-subpage-properties'>
			<LocationType />
			<LocationScale />
			<LocationTilt />
			<LocationDayLength />
		</div>
	);
};
