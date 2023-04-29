// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../../LocationsContext";

// Services

// Styles

// Assets

export const DetailsLogic = () => {
	const { selectedLocationId } = useContext(LocationsContext);

	return { selectedLocationId };
};
