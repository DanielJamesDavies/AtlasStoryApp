// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../context/RoutesContext";
import { CharactersContext } from "../CharactersContext";

// Services

// Styles

// Assets

export const CharactersGroupLogic = () => {
	const { changeLocation } = useContext(RoutesContext);
	const { story, groups, openGroup } = useContext(CharactersContext);

	function navigateToGroup() {
		if (story?.url && groups[openGroup]?.url) changeLocation("s/" + story.url + "/g/" + groups[openGroup].url);
	}

	return { groups, openGroup, navigateToGroup };
};
