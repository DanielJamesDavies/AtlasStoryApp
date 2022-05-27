// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SubstoriesContext } from "../SubstoriesContext";

// Services

// Styles

// Assets

export const SubstoriesTitleLogic = () => {
	const { story, storyIcon } = useContext(SubstoriesContext);

	return { story, storyIcon };
};
