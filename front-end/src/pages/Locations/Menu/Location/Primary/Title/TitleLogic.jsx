// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../../../../LocationsContext";

// Services

// Styles

// Assets

export const LocationTitleLogic = () => {
	const { setSelectedLocationId } = useContext(LocationsContext);

	function onCloseBtnClick(e) {
		e.stopPropagation();
		setSelectedLocationId(false);
	}

	return { onCloseBtnClick };
};
