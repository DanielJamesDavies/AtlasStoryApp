// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../StoryContext";

// Services

// Styles

// Assets

export const StoryPrimaryMembersLogic = () => {
	const { members } = useContext(StoryContext);

	return { members };
};
