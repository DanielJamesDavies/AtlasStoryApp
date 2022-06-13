// Packages
import { useEffect } from "react";
import { useRef, useState, useLayoutEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const LabelContainerLogic = ({ label, className, isInline }) => {
	const [labelContainerClassName, setLabelContainerClassName] = useState(
		isInline ? "label-container label-container-is-inline" : "label-container"
	);

	useEffect(() => {
		function getLabelContainerClassName() {
			let newClassName = "label-container";
			if (isInline) newClassName += "  label-container-is-inline";
			if (className) newClassName += " " + className;
			return newClassName;
		}
		setLabelContainerClassName(getLabelContainerClassName());
	}, [setLabelContainerClassName, isInline, className]);

	const labelLabelRef = useRef();

	const [labelValueStyle, setLabelValueStyle] = useState();
	useLayoutEffect(() => {
		function updateLabelValueStyle() {
			if (!isInline) return setLabelValueStyle({});
			if (!labelLabelRef?.current?.clientWidth) return setLabelValueStyle({});
			setLabelValueStyle({ width: "calc(100% - " + labelLabelRef?.current?.clientWidth + "px - 8px)" });
		}
		updateLabelValueStyle();
		window.addEventListener("resize", updateLabelValueStyle);
		return () => {
			window.removeEventListener("resize", updateLabelValueStyle);
		};
	}, [setLabelValueStyle, labelLabelRef, label, isInline]);

	return { labelContainerClassName, labelLabelRef, labelValueStyle };
};
