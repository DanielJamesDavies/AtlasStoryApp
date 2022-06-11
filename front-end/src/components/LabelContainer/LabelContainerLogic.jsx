// Packages
import { useRef, useState, useLayoutEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const LabelContainerLogic = ({ label }) => {
	const labelLabelRef = useRef();

	const [labelValueStyle, setLabelValueStyle] = useState();
	useLayoutEffect(() => {
		function updateLabelValueStyle() {
			if (!labelLabelRef?.current?.clientWidth) return setLabelValueStyle({});
			setLabelValueStyle({ width: "calc(100% - " + labelLabelRef?.current?.clientWidth + ")" });
		}
		updateLabelValueStyle();
		window.addEventListener("resize", updateLabelValueStyle);
		return () => {
			window.removeEventListener("resize", updateLabelValueStyle);
		};
	}, [setLabelValueStyle, labelLabelRef, label]);

	return { labelLabelRef, labelValueStyle };
};
