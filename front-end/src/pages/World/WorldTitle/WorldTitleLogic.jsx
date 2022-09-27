// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { WorldContext } from "../WorldContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const WorldTitleLogic = () => {
	const { story, storyIcon } = useContext(WorldContext);
	const { changeLocation } = useContext(RoutesContext);

	function goToWorldNotes(e) {
		e.preventDefault();
		if (story?.uid) changeLocation("/s/" + story.uid + "/world/notes", e.button === 1);
	}

	return { story, storyIcon, goToWorldNotes };
};
