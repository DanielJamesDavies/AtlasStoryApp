// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../../../../LocationsContext";

// Services

// Styles

// Assets

export const LocationTypeLogic = () => {
	const { locationTypes, locations, selectedLocationId } = useContext(LocationsContext);

	return { locationTypes, locations, selectedLocationId };
};
