// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../StoryContext";

// Services

// Styles

// Assets

export const StoryGenresLogic = () => {
	const { story } = useContext(StoryContext);

	return { story };
};
