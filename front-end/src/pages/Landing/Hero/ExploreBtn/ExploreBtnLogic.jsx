// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const ExploreBtnLogic = () => {
	const { changeLocation } = useContext(RoutesContext);

	function goToExplorePage() {
		changeLocation("/explore");
	}

	return { goToExplorePage };
};
