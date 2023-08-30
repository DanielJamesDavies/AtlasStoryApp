// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../context/StoryContext";
import { LocationsContext } from "./LocationsContext";

// Services

// Styles

// Assets

export const LocationsLogic = () => {
	const { story, locations } = useContext(StoryContext);
	const { isOnMap, setIsOnMap } = useContext(LocationsContext);

	return { story, locations, isOnMap, setIsOnMap };
};
