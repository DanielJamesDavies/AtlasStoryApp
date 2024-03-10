// Packages
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const MultiLineTextInputLogic = ({ className, icon, value, isSaved, isDark, seamless, isLightText, onChange }) => {
	const inputContainerRef = useRef();
	const inputRef = useRef();
	const inputHeightRef = useRef();

	const [focused, setFocused] = useState(false);
	const [inputClassName, setInputClassName] = useState(
		seamless ? "multi-line-text-input-container multi-line-text-input-container-seamless" : "multi-line-text-input-container"
	);

	const DynamicIconComponent = icon;

	useEffect(() => {
		function getInputClassName() {
			let className = "multi-line-text-input-container";
			if (className) className += " " + className;
			if (focused) className += " multi-line-text-input-container-focused";
			if (value === undefined || value === "") className += " multi-line-text-input-container-empty";
			if (isSaved === false && !focused) className += " multi-line-text-input-container-unsaved";
			if (isDark) className += " multi-line-text-input-container-dark";
			if (seamless) className += " multi-line-text-input-container-seamless";
			if (isLightText) className += " multi-line-text-input-container-light-text";
			return className;
		}
		setInputClassName(getInputClassName());
	}, [className, icon, value, isSaved, isDark, seamless, isLightText, focused]);

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

	const resizeInput = useCallback(() => {
		if (!inputContainerRef?.current || !inputRef?.current || !inputHeightRef?.current) return;

		inputContainerRef.current.setAttribute("style", "height: calc(" + inputHeightRef.current.clientHeight + "px);");
		inputRef.current.setAttribute("style", "height: calc(" + inputHeightRef.current.clientHeight + "px);");
		inputHeightRef.current.setAttribute("style", "width: calc(" + inputRef.current.clientWidth + "px);");

		inputContainerRef.current.setAttribute(
			"style",
			"height: calc(" + inputHeightRef.current.clientHeight + "px); --multiLineTextInputWidth: " + inputRef.current.clientWidth + "px;"
		);
		inputRef.current.setAttribute("style", "height: calc(" + inputHeightRef.current.clientHeight + "px);");
		inputHeightRef.current.setAttribute("style", "width: calc(" + inputRef.current.clientWidth + "px);");
	}, [inputContainerRef, inputRef, inputHeightRef]);

	useEffect(() => {
		const interval = setInterval(() => resizeInput(), 50);
		setTimeout(() => clearInterval(interval), 200);
	}, [resizeInput]);

	// Resize Input
	useLayoutEffect(() => {
		resizeInput();
	}, [resizeInput, value, focused, inputContainerRef, inputRef, inputHeightRef]);

	useEffect(() => {
		window.addEventListener("resize", resizeInput);
		return () => {
			window.removeEventListener("resize", resizeInput);
		};
	}, [resizeInput]);

	function onKeyDownTextArea(e) {
		if (e.key === "Tab") {
			e.preventDefault();
			var start = inputRef.current.selectionStart;
			inputRef.current.value =
				inputRef.current.value.substring(0, start) + "\t" + inputRef.current.value.substring(inputRef.current.selectionEnd);
			inputRef.current.selectionStart = inputRef.current.selectionEnd = start + 1;
			onChange(e);
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

	const [inputContainerStyles, setInputContainerStyles] = useState({ "--multiLineTextInputWidth": "0px" });
	useLayoutEffect(() => {
		function getInputContainerStyles() {
			if (!inputRef?.current?.clientWidth) return;
			setInputContainerStyles({ "--multiLineTextInputWidth": inputRef.current.clientWidth + "px" });
		}
		getInputContainerStyles();
		window.addEventListener("resize", getInputContainerStyles);
		return () => window.removeEventListener("resize", getInputContainerStyles);
	}, [setInputContainerStyles, inputRef]);

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
		inputContainerStyles,
	};
};
