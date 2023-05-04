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
	const [selection, setSelection] = useState([-1, -1]);

	const [isHidden, setIsHidden] = useState(true);
	function toggleIsHidden(e) {
		e.stopPropagation();
		setIsHidden((oldIsHidden) => !oldIsHidden);
	}

	useEffect(() => {
		function getInputClassName() {
			let className = "text-input-container";
			if (props.className) className += " " + props.className;
			if (focused) className += " text-input-container-focused";
			if (props.value === undefined || props.value === "") className += " text-input-container-empty";
			if (props?.isSaved === false && !focused) className += " text-input-container-unsaved";
			if (props?.isDark) className += " text-input-container-dark";
			if (props?.hideValue && isHidden) className += " text-input-container-hide-value";
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
	}, [props, focused, isHidden]);

	function selectAll() {
		if (inputRef && inputRef.current) inputRef.current.select();
	}

	function onClickContainer(e) {
		if (e?.detail === 1 && inputRef && inputRef.current) inputRef.current.focus();
	}

	function onInputContainerFocus() {
		setFocused(true);
	}

	function onInputContainerBlur() {
		setFocused(false);
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
			newInputContainerStyles["--textInputWidth"] =
				inputRef?.current?.clientWidth === undefined ? "200px" : inputRef?.current?.clientWidth + "px";
			setInputContainerStyles(newInputContainerStyles);
		}
		getInputContainerStyles();
	}, [setInputContainerStyles, inputRef]);

	function onMouseDownHiddenCharacter(e, index) {
		e.stopPropagation();
		if (e?.buttons !== 1) return false;
		if (e?.detail === 2) {
			if (props?.value?.length === undefined) return false;
			setSelection([0, props?.value?.split("").length - 1]);
			inputRef.current.setSelectionRange(0, props?.value?.split("").length, "forward");
			inputRef.current.blur();
			setTimeout(() => inputRef.current.focus(), 1);
		} else {
			setSelection([index, -1]);
			inputRef.current.setSelectionRange(index, index, "none");
		}
	}

	function onMouseEnterHiddenCharacter(e, index) {
		e.stopPropagation();
		if (e?.buttons !== 1) return false;
		const newSelection = [selection[0], index];
		setSelection(newSelection);
		inputRef.current.setSelectionRange(
			Math.min(...newSelection),
			Math.max(...newSelection),
			Math.min(...newSelection) === newSelection[0] ? "forward" : "backward"
		);
	}

	return {
		inputContainerRef,
		inputRef,
		inputWidthRef,
		inputClassName,
		inputStyle,
		DynamicIconComponent,
		selectAll,
		onClickContainer,
		onInputContainerFocus,
		onInputContainerBlur,
		isHidden,
		toggleIsHidden,
		onKeyDown,
		inputContainerStyles,
		focused,
		selection,
		onMouseDownHiddenCharacter,
		onMouseEnterHiddenCharacter,
	};
};
