// Packages
import { useState, useEffect, useCallback, useRef } from "react";

// Components

// Logic

// Context

// Services
import isValidHexColour from "../../services/IsValidHexColour";

// Styles

// Assets

export const ColourPickerLogic = ({ value, onChange, size, enableEdit, pickerVerticalPlacement, horizontalAlignment, circular, presetColours }) => {
	const colourPickerRef = useRef();
	const [isShowingPicker, setIsShowingPicker] = useState(false);
	const [colourBlockStyle, setColourBlockStyle] = useState({});

	const getNewPickerVerticalPlacement = useCallback(() => {
		let newPickerVerticalPlacement = false;

		const colourPickerHeight = 280;
		const colourPickerRect = colourPickerRef?.current?.getBoundingClientRect();
		const windowHeight = window?.innerHeight;
		const distanceFromBottom = windowHeight - colourPickerRect?.y - colourPickerHeight;

		if (distanceFromBottom < 0) newPickerVerticalPlacement = "top";

		return newPickerVerticalPlacement;
	}, []);

	const getColourPickerClassName = useCallback(() => {
		const newPickerVerticalPlacement = getNewPickerVerticalPlacement();

		let className = "colour-picker";
		if (size) className += " colour-picker-size-" + size;
		if (enableEdit) className += " colour-picker-is-editing";
		if (!newPickerVerticalPlacement && pickerVerticalPlacement === "bottom") className += " colour-picker-placement-bottom";
		if (newPickerVerticalPlacement === "bottom") className += " colour-picker-placement-bottom";
		if (horizontalAlignment === "right") className += " colour-picker-alignment-right";
		if (circular) className += " colour-picker-circular";
		if (isShowingPicker) className += " colour-picker-is-showing-picker";
		return className;
	}, [getNewPickerVerticalPlacement, size, enableEdit, pickerVerticalPlacement, horizontalAlignment, circular, isShowingPicker]);

	const [colourPickerClassName, setColourPickerClassName] = useState(getColourPickerClassName());

	useEffect(() => {
		setColourPickerClassName(getColourPickerClassName());
	}, [
		getColourPickerClassName,
		setColourPickerClassName,
		size,
		enableEdit,
		pickerVerticalPlacement,
		horizontalAlignment,
		circular,
		isShowingPicker,
	]);

	useEffect(() => {
		setColourBlockStyle(isValidHexColour(value) ? { background: value } : {});
	}, [value]);

	const onMouseMove = useCallback(() => {
		setColourPickerClassName(getColourPickerClassName());
	}, [setColourPickerClassName, getColourPickerClassName]);

	useEffect(() => {
		window.addEventListener("mousemove", onMouseMove);
		return () => {
			window.removeEventListener("mousemove", onMouseMove);
		};
	}, [onMouseMove, isShowingPicker]);

	async function onSketchPickerChange(colour) {
		await onChange(colour.hex);
	}

	const [currentPresetColours, setCurrentPresetColours] = useState([]);

	useEffect(() => {
		const defaultPresetColours = [
			{ color: "#0044ff", title: "Blue" },
			{ color: "#ff0000", title: "Red" },
			{ color: "#ff0055", title: "Pink" },
			{ color: "#aa00ff", title: "Purple" },
			{ color: "#d4af37", title: "Gold" },
			{ color: "#bbbbbb", title: "Silver" },
			{ color: "#ffdd00", title: "Yellow" },
			{ color: "#ff7700", title: "Orange" },
		];

		function getCurrentPresetColours() {
			let newCurrentPresetColours = [];
			if (presetColours) newCurrentPresetColours = newCurrentPresetColours.concat(presetColours);
			newCurrentPresetColours = newCurrentPresetColours.concat(defaultPresetColours);
			setCurrentPresetColours(newCurrentPresetColours);
		}
		getCurrentPresetColours();
	}, [setCurrentPresetColours, presetColours]);

	return {
		colourPickerRef,
		colourPickerClassName,
		isShowingPicker,
		setIsShowingPicker,
		colourBlockStyle,
		currentPresetColours,
		onSketchPickerChange,
	};
};
