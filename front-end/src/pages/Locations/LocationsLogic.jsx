// Packages
import { useContext, useEffect } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../context/StoryContext";
import { LocationsContext } from "./LocationsContext";
import { RoutesContext } from "../../context/RoutesContext";

// Services

// Styles

// Assets

export const LocationsLogic = () => {
	const { story, locations } = useContext(StoryContext);
	const { isOnMap, setIsOnMap, isOnSpaceMap } = useContext(LocationsContext);
	const { locationPath, changeLocation } = useContext(RoutesContext);

	useEffect(() => {
		if (locationPath.current.split("/").filter((e) => e.length !== 0)[2] === "map") {
			setIsOnMap(true);
			changeLocation(
				"/" +
					locationPath.current
						.split("/")
						.filter((e) => e.length !== 0)
						.slice(0, 2)
						.join("/") +
					"/locations"
			);
		}
	}, [locationPath, changeLocation, setIsOnMap]);

	return { story, locations, isOnMap, setIsOnMap, isOnSpaceMap };
};
