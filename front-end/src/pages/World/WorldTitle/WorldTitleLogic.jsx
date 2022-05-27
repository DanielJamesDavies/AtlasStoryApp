// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { WorldContext } from "../WorldContext";

// Services

// Styles

// Assets

export const WorldTitleLogic = () => {
	const { story, storyIcon } = useContext(WorldContext);

	return { story, storyIcon };
};
