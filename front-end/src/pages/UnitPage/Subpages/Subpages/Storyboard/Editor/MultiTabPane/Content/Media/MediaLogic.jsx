// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryboardContext } from "../../../../StoryboardContext";

// Services

// Styles

// Assets

export const MediaLogic = () => {
	const { playerHeight, content_simple, content_images, content_music } = useContext(StoryboardContext);

	return { playerHeight, content_simple, content_images, content_music };
};
