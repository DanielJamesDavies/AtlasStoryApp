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
			if (props?.isLightText) className += " text-input-container-light-text";
			if (props?.size) {
				switch (props.size) {
					case "s":
						className += " text-input-container-size-s";
						break;
					default:
						break;
				}
			}
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
			let newInputStyle = {};
			if (props?.innerStyle) newInputStyle = JSON.parse(JSON.stringify(props.innerStyle));
			if (!props?.autoResize) return setInputStyle(newInputStyle);
			if (!inputRef?.current || !inputWidthRef?.current) return;
			newInputStyle.width = "calc(" + inputWidthRef.current.clientWidth + "px)";
			newInputStyle.maxWidth = "100%";
			setInputStyle(newInputStyle);
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
