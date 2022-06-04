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
	const { isAuthorizedToEdit, members } = useContext(StoryContext);

	return { isAuthorizedToEdit, members };
};
