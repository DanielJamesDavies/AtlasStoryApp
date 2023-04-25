// Packages

// Components
import { Locations } from "./Locations";

// Logic

// Context
import LocationsProvider from "./LocationsContext";

// Services

// Styles

// Assets

export const LocationsContainer = ({ story_uid }) => {
	return (
		<LocationsProvider story_uid={story_uid}>
			<Locations />
		</LocationsProvider>
	);
};
