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

export const CharactersTitleLogic = () => {
	const { story, storyIcon } = useContext(StoryContext);
	const { changeLocation } = useContext(RoutesContext);

	function goToCharactersNotes(e) {
		e.preventDefault();
		if (story?.uid) changeLocation("/s/" + story.uid + "/characters/notes", e.button === 1);
	}

	return { story, storyIcon, goToCharactersNotes };
};
