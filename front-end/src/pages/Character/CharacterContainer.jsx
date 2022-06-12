// Packages

// Components
import { Character } from "./Character";

// Logic

// Context
import CharacterProvider from "./CharacterContext";

// Services

// Styles

// Assets

export const CharacterContainer = ({ story_uid, character_uid }) => {
	return (
		<CharacterProvider story_uid={story_uid} character_uid={character_uid}>
			<Character />
		</CharacterProvider>
	);
};
