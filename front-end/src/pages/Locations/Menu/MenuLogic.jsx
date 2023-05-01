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
	const { isDisplayingHierarchy, setIsDisplayingHierarchy, playerSpeed, setPlayerSpeed } = useContext(LocationsContext);
	const [isDisplayingControlScheme, setIsDisplayingControlScheme] = useState(false);

	function toggleIsDisplayingHierarchy() {
		setIsDisplayingHierarchy((oldIsDisplayingHierarchy) => !oldIsDisplayingHierarchy);
	}

	const speedIcons = [<GiSnail />, <GiRabbit />, <FaFighterJet />, <FaSpaceShuttle />];

	return {
		isDisplayingHierarchy,
		toggleIsDisplayingHierarchy,
		isDisplayingControlScheme,
		setIsDisplayingControlScheme,
		playerSpeed,
		setPlayerSpeed,
		speedIcons,
	};
};
