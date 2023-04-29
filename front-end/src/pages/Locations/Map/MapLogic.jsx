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
	const { locationsMapRef, setSelectedLocationId, isMouseControllingPlayer } = useContext(LocationsContext);
	const [isPlayerMovementEnabled, setisPlayerMovementEnabled] = useState(false);

	function setCursorPointer(value) {
		if (!isMouseControllingPlayer) locationsMapRef.current.style.cursor = value ? "pointer" : "auto";
	}

	return { locationsMapRef, setSelectedLocationId, isPlayerMovementEnabled, setisPlayerMovementEnabled, setCursorPointer };
};
