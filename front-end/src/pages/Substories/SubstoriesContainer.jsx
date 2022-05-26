// Packages

// Components
import { Substories } from "./Substories";

// Logic

// Context
import SubstoriesProvider from "./SubstoriesContext";

// Services

// Styles

// Assets

export const SubstoriesContainer = ({ story_url }) => {
	return (
		<SubstoriesProvider story_url={story_url}>
			<Substories />
		</SubstoriesProvider>
	);
};
