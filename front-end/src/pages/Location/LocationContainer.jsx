// Packages

// Components
import { Location } from "./Location";

// Logic

// Context
import LocationProvider from "./LocationContext";

// Services

// Styles

// Assets

export const LocationContainer = ({ story_uid, location_uid }) => {
	return (
		<LocationProvider story_uid={story_uid} location_uid={location_uid}>
			<Location />
		</LocationProvider>
	);
};
