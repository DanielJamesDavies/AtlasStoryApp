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

export const SubstoriesTitleLogic = () => {
	const { story, storyIcon } = useContext(StoryContext);
	const { changeLocation } = useContext(RoutesContext);

	function goToSubstoriesNotes(e) {
		e.preventDefault();
		if (story?.uid) changeLocation("/s/" + story.uid + "/substories/notes", e.button === 1);
	}
	return { story, storyIcon, goToSubstoriesNotes };
};
