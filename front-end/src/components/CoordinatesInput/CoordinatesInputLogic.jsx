// Packages
import { useEffect, useRef, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const CoordinatesInputLogic = ({ className, value, onChange }) => {
	const [focused, setFocused] = useState(false);
	const coordinatesInputContainerRef = useRef();
	const [coordinatesInputContainerClassName, setCoordinatesInputContainerClassName] = useState(() => {
		let newCoordinatesInputContainerClassName = "coordinates-input-container";
		if (className) newCoordinatesInputContainerClassName += " " + className;
		if (focused) newCoordinatesInputContainerClassName += " coordinates-input-container-focused";
		if (onChange === undefined) newCoordinatesInputContainerClassName += " coordinates-input-container-read-only";
		return newCoordinatesInputContainerClassName;
	});

	useEffect(() => {
		function getCoordinatesInputContainerClassName() {
			let newCoordinatesInputContainerClassName = "coordinates-input-container";
			if (className) newCoordinatesInputContainerClassName += " " + className;
			if (focused) newCoordinatesInputContainerClassName += " coordinates-input-container-focused";
			if (onChange === undefined) newCoordinatesInputContainerClassName += " coordinates-input-container-read-only";
			setCoordinatesInputContainerClassName(newCoordinatesInputContainerClassName);
		}
		getCoordinatesInputContainerClassName();
	}, [className, focused, onChange]);

	function onCoordinatesInputContainerFocus() {
		setFocused(true);
	}

	function onCoordinatesInputContainerBlur() {
		setFocused(false);
	}

	async function onCoordinateChange(e, index) {
		if (onChange === undefined) return false;
		let newValue = JSON.parse(JSON.stringify(value));
		try {
			newValue[index] = parseFloat(e.target.value);
		} catch {}

		if (e.target.value === "") newValue[index] = "";
		if (e.target.value?.trim() === "-") {
			newValue[index] = "-";
		} else if (e.target.value[0] === "-") {
			newValue[index] = -1 * parseFloat(e.target.value.split("-")[1]);
		}
		if (e.target.value[e.target.value.length - 1] === ".") newValue[index] = parseFloat(e.target.value).toString() + ".";

		if (JSON.stringify(value) === JSON.stringify(newValue)) return false;
		if (newValue[index].toString() === "NaN") return false;
		await onChange(e, newValue);
	}

	return {
		coordinatesInputContainerRef,
		coordinatesInputContainerClassName,
		onCoordinatesInputContainerFocus,
		onCoordinatesInputContainerBlur,
		onCoordinateChange,
	};
};
