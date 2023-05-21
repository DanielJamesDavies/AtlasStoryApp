// Packages

// Components

// Logic
import { LocationTypeLogic } from "./TypeLogic";

// Context

// Services

// Styles
import "./Type.css";

// Assets

export const LocationType = () => {
	const { locationTypes, locations, selectedLocationId } = LocationTypeLogic();

	return (
		<div className='locations-location-type'>
			<div className='locations-location-type-label'>Location Type:&nbsp;</div>
			<div className='locations-location-type-value'>
				{
					locationTypes.find(
						(type) => type.type === locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.type
					)?.name
				}
			</div>
		</div>
	);
};
