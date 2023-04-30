// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../../LocationsContext";

// Services

// Styles

// Assets

export const HierarchyLogic = () => {
	const { isMouseOverMap, selectedLocationId, setSelectedLocationId } = useContext(LocationsContext);

	return { isMouseOverMap, selectedLocationId, setSelectedLocationId };
};
