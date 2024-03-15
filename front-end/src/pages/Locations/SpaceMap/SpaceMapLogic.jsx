// Packages
import { useCallback, useContext, useEffect, useState } from "react";

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

	const onMouseEnter = useCallback(() => {
		setIsMouseOverMap(true);
		setIsPlayerMovementEnabled(true);
	}, [setIsMouseOverMap, setIsPlayerMovementEnabled]);

	const onMouseLeave = useCallback(() => {
		setIsMouseOverMap(false);
		setIsPlayerMovementEnabled(false);
	}, [setIsMouseOverMap, setIsPlayerMovementEnabled]);

	const setCursorPointer = useCallback(
		(value) => {
			if (locationsMapRef?.current && !isMouseControllingPlayer) locationsMapRef.current.style.cursor = value ? "pointer" : "auto";
		},
		[locationsMapRef, isMouseControllingPlayer]
	);

	const [locationsMapLabelStyles, setLocationsMapLabelStyles] = useState({});

	const onMouseMove = useCallback(
		(e) => {
			setLocationsMapLabelStyles({ left: e?.clientX, top: e?.clientY });
		},
		[setLocationsMapLabelStyles]
	);

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
