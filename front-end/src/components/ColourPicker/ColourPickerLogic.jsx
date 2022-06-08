// Packages
import { useState, useEffect } from "react";

// Components

// Logic

// Context

// Services
import isValidHexColour from "../../services/IsValidHexColour";

// Styles

// Assets

export const ColourPickerLogic = ({ value, onChange }) => {
	const [colourBlockStyle, setColourBlockStyle] = useState({});

	const presetColours = [
		{ color: "#0044ff", title: "Blue" },
		{ color: "#ff0000", title: "Red" },
		{ color: "#ff2288", title: "Pink" },
		{ color: "#aa00ff", title: "Purple" },
		{ color: "#d4af37", title: "Gold" },
		{ color: "#bbbbbb", title: "Silver" },
		{ color: "#ffdd00", title: "Yellow" },
		{ color: "#ff7700", title: "Orange" },
	];

	useEffect(() => {
		setColourBlockStyle(isValidHexColour(value) ? { background: value } : {});
	}, [value]);

	async function onSketchPickerChange(colour) {
		await onChange(colour.hex);
	}

	return { colourBlockStyle, presetColours, onSketchPickerChange };
};
