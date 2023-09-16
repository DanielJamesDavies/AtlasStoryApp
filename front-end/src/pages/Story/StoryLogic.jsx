// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../context/StoryContext";
import { RoutesContext } from "../../context/RoutesContext";

// Services
import getColourTint from "../../services/GetColourTint";

// Styles

// Assets

export const StoryLogic = () => {
	const { isAuthorizedToEdit, story } = useContext(StoryContext);
	const { location, changeLocationParameters } = useContext(RoutesContext);

	useEffect(() => {
		function updateDocumentTitle() {
			if (!story) return;

			// Document Title
			if (story?.data?.title) {
				document.title = story?.data?.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}
		updateDocumentTitle();
		setTimeout(() => updateDocumentTitle(), 1000);
	}, [story, location]);

	const [storyStyles, setStoryStyles] = useState({});

	useEffect(() => {
		function getStoryStyles() {
			let newStoryStyles = {};
			if (story?.data?.colours?.accent) newStoryStyles["--storyColour"] = story?.data?.colours?.accent;
			if (story?.data?.colours?.accentHover) newStoryStyles["--storyHoverColour"] = story?.data?.colours?.accentHover;

			if (story?.data?.colours?.accent) {
				try {
					newStoryStyles["--storyColourTint"] = getColourTint(story?.data?.colours?.accent);
				} catch {
					newStoryStyles["--storyColourTint"] = story?.data?.colours?.accent;
				}
			} else {
				newStoryStyles["--storyColourTint"] = "#0044ff";
			}

			setStoryStyles(newStoryStyles);
		}
		getStoryStyles();
	}, [story]);

	useEffect(() => {
		changeLocationParameters([]);
	}, [changeLocationParameters]);

	return { isAuthorizedToEdit, story, storyStyles };
};
