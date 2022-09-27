// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const CharactersTitleLogic = () => {
	const { story, storyIcon } = useContext(CharactersContext);
	const { changeLocation } = useContext(RoutesContext);

	function goToCharactersNotes(e) {
		e.preventDefault();
		if (story?.uid) changeLocation("/s/" + story.uid + "/characters/notes", e.button === 1);
	}

	return { story, storyIcon, goToCharactersNotes };
};
