// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";
import { HierarchyFunctions } from "../HierarchyFunctions";

// Services

// Styles

// Assets

export const MapLocationStatusLogic = () => {
	const {
		story,
		locations,
		locationTypes,
		currentMapLocationId,
		setCurrentMapLocationId,
		selectedLocationId,
		hoverMapLocationId,
		isOnSpaceMap,
		setIsOnSpaceMap,
		setIsHidingSpaceMap,
		surfaceMapHoveringRegion,
	} = useContext(LocationsContext);
	const { getPathToItemInHierarchy, getItemInHierarchyFromPath } = HierarchyFunctions();

	const [statusPath, setStatusPath] = useState([]);
	useEffect(() => {
		function getStatusPath() {
			let newStatusPath = [];

			const hierarchy = JSON.parse(JSON.stringify(story?.data?.locationsHierarchy));
			if (!hierarchy) return false;

			if (!currentMapLocationId) return false;

			const currMapLocationHierarchyPath = getPathToItemInHierarchy(currentMapLocationId, hierarchy);

			let currPath = [];
			for (let i = 0; i < currMapLocationHierarchyPath.length; i++) {
				currPath.push(currMapLocationHierarchyPath[i]);
				const currItem = getItemInHierarchyFromPath(currPath, hierarchy);
				const currItemLocation = locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(currItem?._id));
				if (!currItemLocation?.data?.name) continue;
				newStatusPath.push(currItemLocation?.data?.name);
			}

			setStatusPath(newStatusPath);
		}
		getStatusPath();
	}, [setStatusPath, story, locations, currentMapLocationId, getPathToItemInHierarchy, getItemInHierarchyFromPath]);

	function goBackLocation(e) {
		e.stopPropagation();

		setIsHidingSpaceMap(true);

		setTimeout(() => {
			const hierarchy = JSON.parse(JSON.stringify(story?.data?.locationsHierarchy));
			if (!hierarchy) return false;
			let parentCurrMapLocationHierarchyPath = getPathToItemInHierarchy(currentMapLocationId, hierarchy);
			parentCurrMapLocationHierarchyPath.pop();
			const newItem = getItemInHierarchyFromPath(parentCurrMapLocationHierarchyPath, hierarchy);
			if (!newItem?._id) return false;

			const newItemLocation = locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(newItem?._id));
			if (["reality"].includes(newItemLocation?.type)) return false;

			const curr_location = locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(currentMapLocationId));
			if (!["surfaceLocation"].includes(curr_location?.type) && !isOnSpaceMap) {
				return setIsOnSpaceMap(true);
			}

			setCurrentMapLocationId(newItem?._id);
		}, 200);

		setTimeout(() => setIsHidingSpaceMap(false), 210);
	}

	return {
		locations,
		locationTypes,
		statusPath,
		currentMapLocationId,
		selectedLocationId,
		hoverMapLocationId,
		goBackLocation,
		isOnSpaceMap,
		surfaceMapHoveringRegion,
	};
};
