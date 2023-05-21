// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../../../LocationContext";

// Services

// Styles

// Assets

export const LocationOrbitLogic = () => {
	const { location } = useContext(LocationContext);

	return { location };
};
