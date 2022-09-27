// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../StoryContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const StoryPrimaryLogic = () => {
	const { isAuthorizedToEdit, story, setIsDisplayingSettings } = useContext(StoryContext);
	const { changeLocation } = useContext(RoutesContext);

	function goToStoryNotes(e) {
		e.preventDefault();
		if (story?.uid) changeLocation("/s/" + story.uid + "/notes", e.button === 1);
	}

	function openSettings() {
		setIsDisplayingSettings(true);
	}

	return { isAuthorizedToEdit, goToStoryNotes, openSettings };
};
