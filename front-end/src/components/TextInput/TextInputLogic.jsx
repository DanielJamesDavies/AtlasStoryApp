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
		props?.seamless
			? props?.className
				? "text-input-container text-input-container-seamless " + props?.className
				: "text-input-container text-input-container-seamless"
			: props?.className
			? "text-input-container " + props?.className
			: "text-input-container"
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
			if (props?.backgroundColour) {
				switch (props?.backgroundColour) {
					case "grey1":
						className += " text-input-container-bg-grey-1";
						break;
					case "grey2":
						className += " text-input-container-bg-grey-2";
						break;
					case "grey3":
						className += " text-input-container-bg-grey-3";
						break;
					case "grey4":
						className += " text-input-container-bg-grey-4";
						break;
					case "grey5":
						className += " text-input-container-bg-grey-5";
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

	useEffect(() => {
		const onTouch = (e) => (!focused ? null : e.stopPropagation());
		const inputRefCurrent = inputRef.current;
		inputRefCurrent.addEventListener("touchstart", onTouch);
		inputRefCurrent.addEventListener("touchmove", onTouch);
		return () => {
			inputRefCurrent.removeEventListener("touchstart", onTouch);
			inputRefCurrent.removeEventListener("touchmove", onTouch);
		};
	}, [inputRef, focused]);

	function onKeyDown(e) {
		if (e.code === "Enter") props.onKeyEnter();
	}

	const [inputContainerStyles, setInputContainerStyles] = useState({});
	useLayoutEffect(() => {
		function getInputContainerStyles() {
			let newInputContainerStyles = {};
			newInputContainerStyles["--input-height"] =
				inputRef?.current?.clientHeight === undefined ? "15px" : inputRef?.current?.clientHeight + "px";
			setInputContainerStyles(newInputContainerStyles);
		}
		getInputContainerStyles();
	}, [setInputContainerStyles, inputRef]);

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
		onKeyDown,
		inputContainerStyles,
	};
};
