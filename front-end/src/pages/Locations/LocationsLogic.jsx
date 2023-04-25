// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../context/StoryContext";

// Services

// Styles

// Assets

export const LocationsLogic = () => {
	const { story, locations } = useContext(StoryContext);

	return { story, locations };
};
