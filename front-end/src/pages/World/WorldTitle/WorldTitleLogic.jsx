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

export const WorldTitleLogic = () => {
	const { story, storyIcon } = useContext(StoryContext);
	const { changeLocation } = useContext(RoutesContext);

	function goToWorldNotes(e) {
		e.preventDefault();
		if (story?.uid) changeLocation("/s/" + story.uid + "/world/notes", e.button === 1);
	}

	return { story, storyIcon, goToWorldNotes };
};
