// Packages

// Components
import { LocationPrimary } from "./Primary/Primary";
import { LocationSubpages } from "./Subpages/Subpages";

// Logic
import { LocationLogic } from "./LocationLogic";

// Context

// Services

// Styles
import "./Location.css";

// Assets

export const Location = () => {
	const { locationContainerRef, locationPrimaryRef, locationStyles } = LocationLogic();

	return (
		<div ref={locationContainerRef} className='locations-location-container' onClick={(e) => e.stopPropagation()}>
			<div className='locations-location' style={locationStyles}>
				<LocationPrimary locationPrimaryRef={locationPrimaryRef} />
				<LocationSubpages />
			</div>
		</div>
	);
};
