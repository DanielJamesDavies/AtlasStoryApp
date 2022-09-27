// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SubstoriesContext } from "../SubstoriesContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const SubstoriesTitleLogic = () => {
	const { story, storyIcon } = useContext(SubstoriesContext);
	const { changeLocation } = useContext(RoutesContext);

	function goToSubstoriesNotes(e) {
		e.preventDefault();
		if (story?.uid) changeLocation("/s/" + story.uid + "/substories/notes", e.button === 1);
	}
	return { story, storyIcon, goToSubstoriesNotes };
};
