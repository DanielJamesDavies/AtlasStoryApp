// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const GoToMapBtnLogic = () => {
	const { unit, story } = useContext(UnitPageContext);
	const { changeLocation } = useContext(RoutesContext);

	function goToMap(e) {
		if (!story.uid || !unit?._id) return false;
		changeLocation("/s/" + story.uid + "/locations/" + unit?._id, e.button === 1);
	}

	return { goToMap };
};
