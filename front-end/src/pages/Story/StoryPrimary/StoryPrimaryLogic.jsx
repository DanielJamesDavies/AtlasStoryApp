// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../StoryContext";

// Services

// Styles

// Assets

export const StoryPrimaryLogic = () => {
	const { isAuthorizedToEdit } = useContext(StoryContext);

	return { isAuthorizedToEdit };
};
