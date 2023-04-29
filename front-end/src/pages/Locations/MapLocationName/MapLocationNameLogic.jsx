// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";

// Services

// Styles

// Assets

export const MapLocationNameLogic = () => {
	const { locations, hoverMapLocationId } = useContext(LocationsContext);

	return { locations, hoverMapLocationId };
};
