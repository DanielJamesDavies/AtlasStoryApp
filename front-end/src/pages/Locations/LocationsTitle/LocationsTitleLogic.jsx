// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../context/StoryContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const LocationsTitleLogic = () => {
	const { story, storyIcon } = useContext(StoryContext);
	const { changeLocation } = useContext(RoutesContext);

	function goToLocationsNotes(e) {
		e.preventDefault();
		if (story?.uid) changeLocation("/s/" + story.uid + "/locations/notes", e.button === 1);
	}

	return { story, storyIcon, goToLocationsNotes };
};
