// Packages

// Components
import { Substories } from "./Substories";

// Logic

// Context
import SubstoriesProvider from "./SubstoriesContext";

// Services

// Styles

// Assets

export const SubstoriesContainer = ({ story_uid }) => {
	return (
		<SubstoriesProvider story_uid={story_uid}>
			<Substories />
		</SubstoriesProvider>
	);
};
