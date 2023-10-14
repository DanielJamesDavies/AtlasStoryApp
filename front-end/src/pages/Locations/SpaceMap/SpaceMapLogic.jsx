// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";

// Services

// Styles

// Assets

export const SpaceMapLogic = () => {
	const {
		locationsMapRef,
		travellingToMapLocationId,
		selectedLocationId,
		setSelectedLocationId,
		setIsDisplayingHierarchy,
		isMouseControllingPlayer,
		setIsMouseOverMap,
	} = useContext(LocationsContext);
	const [isPlayerMovementEnabled, setIsPlayerMovementEnabled] = useState(false);

	useEffect(() => {
		if (travellingToMapLocationId !== false) setIsPlayerMovementEnabled(false);
	}, [travellingToMapLocationId, setIsPlayerMovementEnabled]);

	function onMouseEnter() {
		setIsMouseOverMap(true);
		setIsPlayerMovementEnabled(true);
	}

	function onMouseLeave() {
		setIsMouseOverMap(false);
		setIsPlayerMovementEnabled(false);
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
		setIsPlayerMovementEnabled,
		setCursorPointer,
	};
};
