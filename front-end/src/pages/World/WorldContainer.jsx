// Packages

// Components
import { World } from "./World";

// Logic

// Context
import WorldProvider from "./WorldContext";

// Services

// Styles

// Assets

export const WorldContainer = ({ story_uid }) => {
	return (
		<WorldProvider story_uid={story_uid}>
			<World />
		</WorldProvider>
	);
};
