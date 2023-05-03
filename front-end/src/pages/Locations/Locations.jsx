// Packages

// Components
import { LoadingCircle } from "../../components/LoadingCircle/LoadingCircle";
import { Menu } from "./Menu/Menu";
import { Map } from "./Map/Map";
import { MapLocationStatus } from "./MapLocationStatus/MapLocationStatus";

// Logic
import { LocationsLogic } from "./LocationsLogic";

// Context

// Services

// Styles
import "./Locations.css";

// Assets

export const Locations = () => {
	const { story, locations } = LocationsLogic();

	if (!story || !locations)
		return (
			<div className='locations'>
				<div className='locations-loading-container'>
					<LoadingCircle center={true} />
				</div>
			</div>
		);

	return (
		<div className='locations'>
			<div className='locations-loading-container locations-loading-container-fade'>
				<div>
					<LoadingCircle center={true} />
				</div>
			</div>
			<Menu />
			<Map />
			<MapLocationStatus />
		</div>
	);
};
