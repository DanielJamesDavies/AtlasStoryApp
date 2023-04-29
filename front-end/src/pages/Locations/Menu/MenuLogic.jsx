// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";

// Services

// Styles

// Assets

export const MenuLogic = () => {
	const { isDisplayingHierarchy, setIsDisplayingHierarchy, playerActions, playerSpeed } = useContext(LocationsContext);
	const [isDisplayingControlScheme, setIsDisplayingControlScheme] = useState(false);

	function toggleIsDisplayingHierarchy() {
		setIsDisplayingHierarchy((oldIsDisplayingHierarchy) => !oldIsDisplayingHierarchy);
	}

	return {
		isDisplayingHierarchy,
		toggleIsDisplayingHierarchy,
		isDisplayingControlScheme,
		setIsDisplayingControlScheme,
		playerActions,
		playerSpeed,
	};
};
