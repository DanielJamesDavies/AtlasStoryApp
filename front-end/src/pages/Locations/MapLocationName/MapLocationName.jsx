// Packages

// Components

// Logic
import { MapLocationNameLogic } from "./MapLocationNameLogic";

// Context

// Services

// Styles
import "./MapLocationName.css";

// Assets

export const MapLocationName = () => {
	const { locations, hoverMapLocationId } = MapLocationNameLogic();

	if (!locations) return null;

	return (
		<div className='locations-map-location-name-container'>
			<div className='locations-map-location-name'>
				{locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(hoverMapLocationId))?.data?.name}
			</div>
		</div>
	);
};
