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
	const { selectedLocationId, setSelectedLocationId } = useContext(LocationsContext);

	return { selectedLocationId, setSelectedLocationId };
};
