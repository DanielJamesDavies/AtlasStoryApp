// Packages

// Components
import { Objects } from "./Objects";

// Logic

// Context
import ObjectsProvider from "./ObjectsContext";

// Services

// Styles

// Assets

export const ObjectsContainer = ({ story_uid }) => {
	return (
		<ObjectsProvider story_uid={story_uid}>
			<Objects />
		</ObjectsProvider>
	);
};
