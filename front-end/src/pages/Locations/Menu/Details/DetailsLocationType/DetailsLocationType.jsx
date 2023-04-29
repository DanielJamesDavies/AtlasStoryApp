// Packages

// Components

// Logic
import { DetailsLocationTypeLogic } from "./DetailsLocationTypeLogic";

// Context

// Services

// Styles
import "./DetailsLocationType.css";

// Assets

export const DetailsLocationType = () => {
	const { locationTypes, locations, selectedLocationId } = DetailsLocationTypeLogic();

	return (
		<div className='locations-details-type'>
			<div className='locations-details-type-label'>Location Type:&nbsp;</div>
			<div className='locations-details-type-value'>
				{
					locationTypes.find(
						(type) => type.type === locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(selectedLocationId))?.type
					)?.name
				}
			</div>
		</div>
	);
};
