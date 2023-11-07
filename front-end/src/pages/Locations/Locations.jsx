// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";

// Components
import { LoadingCircle } from "../../components/LoadingCircle/LoadingCircle";
import { LocationsTitle } from "./LocationsTitle/LocationsTitle";
import { LocationsList } from "./LocationsList/LocationsList";
import { Menu } from "./Menu/Menu";
import { SpaceMap } from "./SpaceMap/SpaceMap";
import { SurfaceMap } from "./SurfaceMap/SurfaceMap";
import { MapLocationStatus } from "./MapLocationStatus/MapLocationStatus";
import { CreateLocationForm } from "./CreateLocationForm/CreateLocationForm";
import { LocationVersion } from "./LocationVersion/LocationVersion";

// Logic
import { LocationsLogic } from "./LocationsLogic";

// Context

// Services

// Styles
import "./Locations.css";

// Assets
import MapBtnBackground from "../../content/map-btn-background.png";

export const Locations = () => {
	const { story, locations, isOnMap, setIsOnMap, isOnSpaceMap } = LocationsLogic();

	if (!story || !locations)
		return (
			<div className='locations'>
				<div className='locations-loading-container'>
					<LoadingCircle center={true} />
				</div>
			</div>
		);

	if (isOnMap)
		return (
			<div className='locations locations-is-on-map'>
				<div className='locations-loading-container locations-loading-container-fade'>
					<div className='locations-loading-loading-circle-container'>
						<LoadingCircle center={true} />
					</div>
				</div>
				<Menu />
				<div className='locations-header'>
					<MapLocationStatus />
					{isOnSpaceMap ? null : <LocationVersion />}
				</div>
				{isOnSpaceMap ? <SpaceMap /> : <SurfaceMap />}

				<CreateLocationForm />
			</div>
		);

	return (
		<div className='locations'>
			<LocationsTitle />
			<button className='locations-map-btn' onClick={() => setIsOnMap(true)}>
				<div className='locations-map-btn-label'>
					<FontAwesomeIcon icon={faMap} />
					<div className='locations-map-btn-label-text'>Map</div>
				</div>
				<img src={MapBtnBackground} alt='' />
			</button>
			<LocationsList />
			<CreateLocationForm />
		</div>
	);
};
