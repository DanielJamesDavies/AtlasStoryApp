// Packages

// Components
import { Location } from "./Location";

// Logic

// Context
import LocationProvider from "./LocationContext";

// Services

// Styles

// Assets

export const LocationContainer = ({ location_id }) => {
	if (!location_id) return null;
	return (
		<LocationProvider location_id={location_id}>
			<Location />
		</LocationProvider>
	);
};
