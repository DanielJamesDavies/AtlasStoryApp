// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../StoryContext";

// Services

// Styles

// Assets

export const StoryPrimaryCharactersLogic = () => {
	const { isAuthorizedToModify, primaryCharacters, toggleIsReorderingCharacters } = useContext(StoryContext);

	return { isAuthorizedToModify, primaryCharacters, toggleIsReorderingCharacters };
};
