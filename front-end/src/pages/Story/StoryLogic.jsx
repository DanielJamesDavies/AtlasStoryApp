// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../context/StoryContext";

// Services

// Styles

// Assets

export const StoryLogic = () => {
	const { isAuthorizedToEdit, story } = useContext(StoryContext);

	const [storyStyles, setStoryStyles] = useState({});

	useEffect(() => {
		function getStoryStyles() {
			let newStoryStyles = {};
			if (story?.data?.colours?.accent) newStoryStyles["--storyColour"] = story?.data?.colours?.accent;
			if (story?.data?.colours?.accentHover) newStoryStyles["--storyHoverColour"] = story?.data?.colours?.accentHover;
			setStoryStyles(newStoryStyles);
		}
		getStoryStyles();
	}, [story]);

	return { isAuthorizedToEdit, story, storyStyles };
};
