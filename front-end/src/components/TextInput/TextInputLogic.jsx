// Packages
import { useEffect, useRef, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const TextInputLogic = (props) => {
	const inputContainerRef = useRef();
	const inputRef = useRef();
	const [focused, setFocused] = useState(false);
	const DynamicIconComponent = props.icon;

	useEffect(() => {
		if (inputContainerRef?.current) inputContainerRef.current.addEventListener("click", focusOnInput);
		if (inputRef?.current) {
			inputRef.current.addEventListener("focus", onInputContainerFocus);
			inputRef.current.addEventListener("blur", onInputContainerBlur);
		}
		return () => {
			if (inputContainerRef?.current) inputContainerRef.current.removeEventListener("click", focusOnInput);
			if (inputRef?.current) {
				inputRef.current.removeEventListener("focus", onInputContainerFocus);
				inputRef.current.removeEventListener("blur", onInputContainerBlur);
			}
		};
	});

	function focusOnInput() {
		if (inputRef && inputRef.current) inputRef.current.focus();
	}

	function onInputContainerFocus() {
		setFocused(true);
	}

	function onInputContainerBlur() {
		setFocused(false);
	}

	function inputClassName(props, focused) {
		let className = "text-input-container";
		if (props.className) className += " " + props.className;
		if (focused) className += " text-input-container-focused";
		if (props.value === undefined || props.value === "") className += " text-input-container-empty";
		if (props.isSaved === false && !focused) className += " text-input-container-unsaved";
		if (props.isDark) className += " text-input-container-dark";
		if (props.hideValue) className += " text-input-container-hide-value";
		return className;
	}

	function selectAll() {
		if (inputRef && inputRef.current) inputRef.current.select();
	}

	// Hide Value
	const [isHidden, setIsHidden] = useState(true);

	function toggleIsHidden(e) {
		e.stopPropagation();
		setIsHidden((oldIsHidden) => !oldIsHidden);
	}

	return { inputContainerRef, inputRef, focused, setFocused, inputClassName, DynamicIconComponent, selectAll, isHidden, toggleIsHidden };
};
