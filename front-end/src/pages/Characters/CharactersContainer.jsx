// Packages

// Components
import { Characters } from "./Characters";

// Logic

// Context
import CharactersProvider from "./CharactersContext";

// Services

// Styles

// Assets

export const CharactersContainer = ({ story_uid }) => {
	return (
		<CharactersProvider story_uid={story_uid}>
			<Characters />
		</CharactersProvider>
	);
};
