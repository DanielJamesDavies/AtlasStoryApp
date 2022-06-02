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
	const [inputClassName, setInputClassName] = useState("multi-line-text-input-container");

	const DynamicIconComponent = props.icon;

	useEffect(() => {
		function getInputClassName() {
			let className = "multi-line-text-input-container";
			if (props.className) className += " " + props.className;
			if (focused) className += " multi-line-text-input-container-focused";
			if (props.value === undefined || props.value === "") className += " multi-line-text-input-container-empty";
			if (props.isSaved === false && !focused) className += " multi-line-text-input-container-unsaved";
			if (props.isDark) className += " multi-line-text-input-container-dark";
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
			console.log(inputRef, inputHeightRef);
			if (!inputRef?.current || !inputHeightRef?.current) return;
			inputRef.current.setAttribute("style", "height: calc(" + inputHeightRef.current.clientHeight + "px);");
			inputHeightRef.current.setAttribute("style", "width: calc(" + inputRef.current.clientWidth + "px);");
		}

		resizeInput();
		let reloadTimer = setTimeout(() => resizeInput(), 50);
		window.addEventListener("resize", resizeInput);
		return () => {
			clearTimeout(reloadTimer);
			window.removeEventListener("resize", resizeInput);
		};
	}, [props, focused, inputRef, inputHeightRef]);

	function onKeyDownTextArea(e) {
		if (e.key === "Tab") {
			e.preventDefault();
			var start = inputRef.current.selectionStart;
			inputRef.current.value =
				inputRef.current.value.substring(0, start) + "\t" + inputRef.current.value.substring(inputRef.current.selectionEnd);
			inputRef.current.selectionStart = inputRef.current.selectionEnd = start + 1;
		}
	}

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
	};
};
