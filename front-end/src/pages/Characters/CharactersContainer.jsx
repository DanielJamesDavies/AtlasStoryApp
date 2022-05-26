// Packages

// Components
import { Characters } from "./Characters";

// Logic

// Context
import CharactersProvider from "./CharactersContext";

// Services

// Styles

// Assets

export const CharactersContainer = ({ story_url }) => {
	return (
		<CharactersProvider story_url={story_url}>
			<Characters />
		</CharactersProvider>
	);
};
