// Packages
import { useContext, useState } from "react";
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
	const { selectedLocationId, setSelectedLocationId, isDisplayingHierarchy, setIsDisplayingHierarchy, playerSpeed, setPlayerSpeed } =
		useContext(LocationsContext);
	const [isDisplayingControlScheme, setIsDisplayingControlScheme] = useState(false);

	function toggleIsDisplayingHierarchy() {
		if (isDisplayingHierarchy) setSelectedLocationId(false);
		setIsDisplayingHierarchy(!isDisplayingHierarchy);
	}

	const speedIcons = [<GiSnail />, <GiRabbit />, <FaFighterJet />, <FaSpaceShuttle />];

	return {
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
	};
};
