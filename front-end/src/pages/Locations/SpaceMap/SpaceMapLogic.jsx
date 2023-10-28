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
		locations,
		locationTypes,
		locationsMapRef,
		travellingToMapLocationId,
		selectedLocationId,
		setSelectedLocationId,
		setIsDisplayingHierarchy,
		isMouseControllingPlayer,
		setIsMouseOverMap,
		isHidingSpaceMap,
		hoverMapLocationId,
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
		if (locationsMapRef?.current && !isMouseControllingPlayer) locationsMapRef.current.style.cursor = value ? "pointer" : "auto";
	}

	const [locationsMapLabelStyles, setLocationsMapLabelStyles] = useState({});

	function onMouseMove(e) {
		setLocationsMapLabelStyles({ left: e?.clientX, top: e?.clientY });
	}

	return {
		locations,
		locationTypes,
		locationsMapRef,
		onMouseEnter,
		onMouseLeave,
		selectedLocationId,
		setSelectedLocationId,
		setIsDisplayingHierarchy,
		isPlayerMovementEnabled,
		setIsPlayerMovementEnabled,
		setCursorPointer,
		isHidingSpaceMap,
		hoverMapLocationId,
		onMouseMove,
		locationsMapLabelStyles,
		travellingToMapLocationId,
	};
};
