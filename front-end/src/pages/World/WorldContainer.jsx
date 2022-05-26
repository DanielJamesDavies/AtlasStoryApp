// Packages

// Components
import { World } from "./World";

// Logic

// Context
import WorldProvider from "./WorldContext";

// Services

// Styles

// Assets

export const WorldContainer = ({ story_url }) => {
	return (
		<WorldProvider story_url={story_url}>
			<World />
		</WorldProvider>
	);
};
