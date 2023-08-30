// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../LocationContext";

// Services

// Styles

// Assets

export const LocationOverviewLogic = () => {
	const { locationOverviewBackground } = useContext(LocationContext);

	return { locationOverviewBackground };
};
