// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../../context/RoutesContext";
import { StoryContext } from "../../../../context/StoryContext";

// Services

// Styles

// Assets

export const WorldItemLogic = ({ item }) => {
	const { changeLocation } = useContext(RoutesContext);
	const { story } = useContext(StoryContext);

	function onClick(e) {
		changeLocation("/s/" + story.uid + "/w/" + item.link, e.button === 1);
	}

	function onMouseDown(e) {
		if (e.button === 1) e.preventDefault();
	}

	return { onClick, onMouseDown };
};
