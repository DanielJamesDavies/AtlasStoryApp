// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const UserStoryItemLogic = ({ story }) => {
	const { changeLocation } = useContext(RoutesContext);

	function navigateToStory() {
		changeLocation("/s/" + story.url);
	}

	function navigateToOwner(e) {
		e.stopPropagation();
		if (story?.owner?.username) changeLocation("/u/" + story.owner.username);
	}

	return { navigateToStory, navigateToOwner };
};
