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

export const ObjectsTitleLogic = () => {
	const { story, storyIcon } = useContext(StoryContext);
	const { changeLocation } = useContext(RoutesContext);

	function goToObjectsNotes(e) {
		e.preventDefault();
		if (story?.uid) changeLocation("/s/" + story.uid + "/objects/notes", e.button === 1);
	}

	return { story, storyIcon, goToObjectsNotes };
};
