// Packages
import { useCallback, useContext, useEffect, useState } from "react";
import { FaFighterJet, FaSpaceShuttle } from "react-icons/fa";
import { GiRabbit, GiSnail } from "react-icons/gi";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";

// Services

// Styles

// Assets

export const MenuLogic = () => {
	const {
		currentMapLocationId,
		selectedLocationId,
		setSelectedLocationId,
		isDisplayingHierarchy,
		setIsDisplayingHierarchy,
		playerSpeed,
		setPlayerSpeed,
		isOnSpaceMap,
	} = useContext(LocationsContext);

	const [locationsMenuContainerClassName, setLocationsMenuContainerClassName] = useState("locations-menu-container");

	const getLocationsMenuContainerClassName = useCallback(() => {
		let newLocationsMenuContainerClassName = "locations-menu-container";
		if (isDisplayingHierarchy) newLocationsMenuContainerClassName += " locations-menu-container-is-displaying";
		if (selectedLocationId !== false) newLocationsMenuContainerClassName += " locations-menu-container-selected-location";
		setLocationsMenuContainerClassName(newLocationsMenuContainerClassName);
	}, [isDisplayingHierarchy, selectedLocationId]);

	useEffect(() => {
		getLocationsMenuContainerClassName();
	}, [getLocationsMenuContainerClassName, isDisplayingHierarchy, selectedLocationId]);

	const [isDisplayingControlScheme, setIsDisplayingControlScheme] = useState(false);

	function toggleIsDisplayingHierarchy() {
		if (isDisplayingHierarchy) {
			setSelectedLocationId(false);
		} else {
			setSelectedLocationId(currentMapLocationId);
		}
		setIsDisplayingHierarchy(!isDisplayingHierarchy);
	}

	const speedIcons = [<GiSnail />, <GiRabbit />, <FaFighterJet />, <FaSpaceShuttle />];

	return {
		locationsMenuContainerClassName,
		selectedLocationId,
		setSelectedLocationId,
		isDisplayingHierarchy,
		setIsDisplayingHierarchy,
		toggleIsDisplayingHierarchy,
		isDisplayingControlScheme,
		setIsDisplayingControlScheme,
		playerSpeed,
		setPlayerSpeed,
		speedIcons,
		isOnSpaceMap,
	};
};
