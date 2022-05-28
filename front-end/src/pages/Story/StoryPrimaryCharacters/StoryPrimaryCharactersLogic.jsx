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
	const { isAuthorizedToModify, primaryCharacters, isReorderingCharacters, toggleIsReorderingCharacters } = useContext(StoryContext);

	return { isAuthorizedToModify, primaryCharacters, isReorderingCharacters, toggleIsReorderingCharacters };
};
