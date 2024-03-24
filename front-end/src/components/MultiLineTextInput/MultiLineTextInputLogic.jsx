// Packages
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const MultiLineTextInputLogic = ({ icon, onChange }) => {
	const inputContainerRef = useRef();
	const inputRef = useRef();
	const inputHeightRef = useRef();

	const [focused, setFocused] = useState(false);

	const DynamicIconComponent = icon;

	function selectAll() {
		if (inputRef && inputRef.current) inputRef.current.select();
	}

	function onClick() {
		if (inputRef && inputRef.current) inputRef.current.focus();
	}

	function onInputContainerFocus() {
		setFocused(true);
	}

	function onInputContainerBlur() {
		setFocused(false);
	}

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

	const getInputContainerStyles = useCallback(() => {
		if (!inputRef?.current?.clientWidth) return;
		setInputContainerStyles({
			"--multiLineTextInputWidth": inputRef.current.clientWidth + "px",
		});
	}, [setInputContainerStyles, inputRef]);

	useLayoutEffect(() => {
		getInputContainerStyles();
		window.addEventListener("resize", getInputContainerStyles);
		return () => window.removeEventListener("resize", getInputContainerStyles);
	}, [getInputContainerStyles]);

	return {
		inputContainerRef,
		inputRef,
		inputHeightRef,
		DynamicIconComponent,
		selectAll,
		onClick,
		onInputContainerFocus,
		onInputContainerBlur,
		onKeyDownTextArea,
		focused,
		inputContainerStyles,
	};
};
