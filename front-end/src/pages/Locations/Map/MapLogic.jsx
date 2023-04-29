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
	const { locationsMapRef, setSelectedLocationId } = useContext(LocationsContext);
	const [isPlayerMovementEnabled, setisPlayerMovementEnabled] = useState(false);

	function setCursorPointer(value) {
		locationsMapRef.current.style.cursor = value ? "pointer" : "auto";
	}

	return { locationsMapRef, setSelectedLocationId, isPlayerMovementEnabled, setisPlayerMovementEnabled, setCursorPointer };
};
