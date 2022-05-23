// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const UserStoryItemLogic = () => {
	const { changeLocation } = useContext(RoutesContext);

	function navigateToStory() {
		changeLocation("/s/story");
	}

	return { navigateToStory };
};
