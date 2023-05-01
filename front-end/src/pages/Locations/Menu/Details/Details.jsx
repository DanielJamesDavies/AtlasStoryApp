// Packages

// Components
import { DetailsLocationName } from "./DetailsLocationName/DetailsLocationName";
import { DetailsLocationType } from "./DetailsLocationType/DetailsLocationType";
import { DetailsLocationPosition } from "./DetailsLocationPosition/DetailsLocationPosition";
import { DetailsLocationRotation } from "./DetailsLocationRotation/DetailsLocationRotation";
import { DetailsLocationPaths } from "./DetailsLocationPaths/DetailsLocationPaths";

// Logic
import { DetailsLogic } from "./DetailsLogic";

// Context

// Services

// Styles
import "./Details.css";

// Assets

export const Details = () => {
	const { selectedLocationId } = DetailsLogic();

	if (!selectedLocationId) return null;
	return (
		<div className='locations-details-container' onClick={(e) => e.stopPropagation()}>
			<div className='locations-details'>
				<div className='locations-details-title'>Details</div>
				<DetailsLocationName />
				<DetailsLocationType />
				<DetailsLocationPosition />
				<DetailsLocationRotation />
				<DetailsLocationPaths />
			</div>
		</div>
	);
};
