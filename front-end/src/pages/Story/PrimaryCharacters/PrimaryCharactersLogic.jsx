// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../context/StoryContext";

// Services

// Styles

// Assets

export const PrimaryCharactersLogic = () => {
	const { isAuthorizedToEdit, storyCharacters, toggleIsReorderingCharacters } = useContext(StoryContext);

	return { isAuthorizedToEdit, storyCharacters, toggleIsReorderingCharacters };
};
