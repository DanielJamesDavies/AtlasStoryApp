// Packages
import { useContext, useEffect, useRef } from "react";

// Components

// Logic

// Context
import { StoryboardContext } from "./StoryboardContext";

// Services

// Styles

// Assets

export const StoryboardLogic = () => {
	const { isEditingStoryboard } = useContext(StoryboardContext);

	const storyboardRef = useRef();

	useEffect(() => {
		const interval = setInterval(() => {
			if (storyboardRef?.current?.parentNode) storyboardRef.current.parentNode.scrollLeft = 0;
		}, 10);
		return () => clearInterval(interval);
	}, [storyboardRef]);

	return { storyboardRef, isEditingStoryboard };
};
