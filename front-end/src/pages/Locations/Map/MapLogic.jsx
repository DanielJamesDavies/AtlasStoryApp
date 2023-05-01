// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";

// Services

// Styles
import "./Map.css";

// Assets

export const MapLogic = () => {
	const { locationsMapRef, selectedLocationId, setSelectedLocationId, setIsDisplayingHierarchy, isMouseControllingPlayer, setIsMouseOverMap } =
		useContext(LocationsContext);
	const [isPlayerMovementEnabled, setisPlayerMovementEnabled] = useState(false);

	function onMouseEnter() {
		setIsMouseOverMap(true);
		setisPlayerMovementEnabled(true);
	}

	function onMouseLeave() {
		setIsMouseOverMap(false);
		setisPlayerMovementEnabled(false);
	}

	function setCursorPointer(value) {
		if (!isMouseControllingPlayer) locationsMapRef.current.style.cursor = value ? "pointer" : "auto";
	}

	return {
		locationsMapRef,
		onMouseEnter,
		onMouseLeave,
		selectedLocationId,
		setSelectedLocationId,
		setIsDisplayingHierarchy,
		isPlayerMovementEnabled,
		setCursorPointer,
	};
};
