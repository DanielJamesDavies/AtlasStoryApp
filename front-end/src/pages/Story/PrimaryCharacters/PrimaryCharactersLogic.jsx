// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../StoryContext";

// Services

// Styles

// Assets

export const PrimaryCharactersLogic = () => {
	const { isAuthorizedToEdit, primaryCharacters, toggleIsReorderingCharacters } = useContext(StoryContext);

	return { isAuthorizedToEdit, primaryCharacters, toggleIsReorderingCharacters };
};
