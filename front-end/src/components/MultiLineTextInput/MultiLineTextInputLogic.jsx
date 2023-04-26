// Packages
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const MultiLineTextInputLogic = (props) => {
	const inputContainerRef = useRef();
	const inputRef = useRef();
	const inputHeightRef = useRef();

	const [focused, setFocused] = useState(false);
	const [inputClassName, setInputClassName] = useState(
		props?.seamless ? "multi-line-text-input-container multi-line-text-input-container-seamless" : "multi-line-text-input-container"
	);

	const DynamicIconComponent = props.icon;

	useEffect(() => {
		function getInputClassName() {
			let className = "multi-line-text-input-container";
			if (props.className) className += " " + props.className;
			if (focused) className += " multi-line-text-input-container-focused";
			if (props.value === undefined || props.value === "") className += " multi-line-text-input-container-empty";
			if (props.isSaved === false && !focused) className += " multi-line-text-input-container-unsaved";
			if (props.isDark) className += " multi-line-text-input-container-dark";
			if (props.seamless) className += " multi-line-text-input-container-seamless";
			if (props?.isLightText) className += " multi-line-text-input-container-light-text";
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

	// Resize Input
	useLayoutEffect(() => {
		function resizeInput() {
			if (!inputContainerRef?.current || !inputRef?.current || !inputHeightRef?.current) return;

			inputContainerRef.current.setAttribute("style", "height: calc(" + inputHeightRef.current.clientHeight + "px);");
			inputRef.current.setAttribute("style", "height: calc(" + inputHeightRef.current.clientHeight + "px);");
			inputHeightRef.current.setAttribute("style", "width: calc(" + inputRef.current.clientWidth + "px);");

			inputContainerRef.current.setAttribute("style", "height: calc(" + inputHeightRef.current.clientHeight + "px);");
			inputRef.current.setAttribute("style", "height: calc(" + inputHeightRef.current.clientHeight + "px);");
			inputHeightRef.current.setAttribute("style", "width: calc(" + inputRef.current.clientWidth + "px);");
		}
		resizeInput();
		let reloadTimer = setTimeout(() => resizeInput(), 10);
		window.addEventListener("resize", resizeInput);
		return () => {
			clearTimeout(reloadTimer);
			window.removeEventListener("resize", resizeInput);
		};
	}, [props, focused, inputContainerRef, inputRef, inputHeightRef]);

	function onKeyDownTextArea(e) {
		if (e.key === "Tab") {
			e.preventDefault();
			var start = inputRef.current.selectionStart;
			inputRef.current.value =
				inputRef.current.value.substring(0, start) + "\t" + inputRef.current.value.substring(inputRef.current.selectionEnd);
			inputRef.current.selectionStart = inputRef.current.selectionEnd = start + 1;
			props.onChange(e);
		}
	}

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

	return {
		inputContainerRef,
		inputRef,
		inputHeightRef,
		inputClassName,
		DynamicIconComponent,
		selectAll,
		focusOnInput,
		onInputContainerFocus,
		onInputContainerBlur,
		onKeyDownTextArea,
		focused,
	};
};
