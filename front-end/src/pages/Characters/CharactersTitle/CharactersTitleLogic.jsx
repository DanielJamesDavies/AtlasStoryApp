// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";

// Services

// Styles

// Assets

export const CharactersTitleLogic = () => {
	const { story, storyIcon } = useContext(CharactersContext);

	return { story, storyIcon };
};
