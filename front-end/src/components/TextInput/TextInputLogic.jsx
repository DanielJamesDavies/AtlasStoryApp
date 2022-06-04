// Packages
import { useEffect, useRef, useState, useLayoutEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const TextInputLogic = (props) => {
	const inputContainerRef = useRef();
	const inputRef = useRef();
	const inputWidthRef = useRef();
	const [focused, setFocused] = useState(false);
	const [inputClassName, setInputClassName] = useState(
		props?.seamless ? "text-input-container text-input-container-seamless" : "text-input-container"
	);
	const DynamicIconComponent = props.icon;

	useEffect(() => {
		function getInputClassName() {
			let className = "text-input-container";
			if (props.className) className += " " + props.className;
			if (focused) className += " text-input-container-focused";
			if (props.value === undefined || props.value === "") className += " text-input-container-empty";
			if (props?.isSaved === false && !focused) className += " text-input-container-unsaved";
			if (props?.isDark) className += " text-input-container-dark";
			if (props?.hideValue) className += " text-input-container-hide-value";
			if (props?.seamless) className += " text-input-container-seamless";
			return className;
		}
		setInputClassName(getInputClassName());
	}, [props, focused]);

	function selectAll() {
		if (inputRef && inputRef.current) inputRef.current.select();
	}

	function focusOnInput() {
		if (inputRef && inputRef.current) inputRef.current.focus();
	}

	function onInputContainerFocus() {
		setFocused(true);
	}

	function onInputContainerBlur() {
		setFocused(false);
	}

	// Hide Value
	const [isHidden, setIsHidden] = useState(true);

	function toggleIsHidden(e) {
		e.stopPropagation();
		setIsHidden((oldIsHidden) => !oldIsHidden);
	}

	// Resize Input
	const [inputStyle, setInputStyle] = useState({});

	useLayoutEffect(() => {
		function resizeInput() {
			if (!props?.autoResize) return setInputStyle({});
			if (!inputRef?.current || !inputWidthRef?.current) return;
			// let inputRefStyle = window.getComputedStyle(inputContainerRef.current);
			// console.log(inputRefStyle.getPropertyValue("max-width"));
			setInputStyle({ width: "calc(" + inputWidthRef.current.clientWidth + "px)", maxWidth: "100%" });
		}

		resizeInput();
		let reloadTimer = setTimeout(() => resizeInput(), 50);
		window.addEventListener("resize", resizeInput);
		return () => {
			clearTimeout(reloadTimer);
			window.removeEventListener("resize", resizeInput);
		};
	}, [props, focused, inputRef, inputWidthRef, setInputStyle]);

	return {
		inputContainerRef,
		inputRef,
		inputWidthRef,
		inputClassName,
		inputStyle,
		DynamicIconComponent,
		selectAll,
		focusOnInput,
		onInputContainerFocus,
		onInputContainerBlur,
		isHidden,
		toggleIsHidden,
	};
};
