// Packages

// Components
import { Character } from "./Character";

// Logic

// Context
import CharacterProvider from "./CharacterContext";

// Services

// Styles

// Assets

export const CharacterContainer = ({ story_url, character_url }) => {
	return (
		<CharacterProvider story_url={story_url} character_url={character_url}>
			<Character />
		</CharacterProvider>
	);
};
