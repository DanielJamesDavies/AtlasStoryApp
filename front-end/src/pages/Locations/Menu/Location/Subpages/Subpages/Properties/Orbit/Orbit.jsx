// Packages

// Components
import { LocationInclination } from "./Inclination/Inclination";

// Logic
import { LocationOrbitLogic } from "./OrbitLogic";

// Context

// Services

// Styles
import "./Orbit.css";

// Assets

export const LocationOrbit = () => {
	const { location } = LocationOrbitLogic();

	if (!["planet", "moon", "artificialSatellite"].includes(location?.type)) return null;
	return (
		<div className='locations-location-orbit-container'>
			<div className='locations-location-orbit-title'>Orbit</div>
			<LocationInclination />
		</div>
	);
};
