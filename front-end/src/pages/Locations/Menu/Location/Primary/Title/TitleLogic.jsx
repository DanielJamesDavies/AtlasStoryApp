// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../../../../LocationsContext";
import { RoutesContext } from "../../../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const LocationTitleLogic = () => {
	const { locations, currentMapLocationId, story, setSelectedLocationId } = useContext(LocationsContext);
	const { changeLocation } = useContext(RoutesContext);

	const goToLocationBtnRef = useRef();

	function goToLocation(e) {
		const location = locations.find((e) => e?._id === currentMapLocationId);
		if (!story?.uid || !location?.uid) return false;
		changeLocation("/s/" + story.uid + "/l/" + location.uid, e.button === 1);
		goToLocationBtnRef.current.blur();
	}

	function onCloseBtnClick(e) {
		e.stopPropagation();
		setSelectedLocationId(false);
	}

	return { goToLocationBtnRef, goToLocation, onCloseBtnClick };
};
