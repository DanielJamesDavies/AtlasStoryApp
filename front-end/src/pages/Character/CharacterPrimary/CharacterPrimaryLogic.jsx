// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../CharacterContext";

// Services

// Styles

// Assets

export const CharacterPrimaryLogic = () => {
	const { story, storyIcon } = useContext(CharacterContext);

	return { story, storyIcon };
};
