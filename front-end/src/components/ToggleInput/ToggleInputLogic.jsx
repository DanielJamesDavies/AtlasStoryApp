// Packages
import { useState, useEffect } from "react";

// Components

// Logic

// Context

// Styles
import "./ToggleInput.css";

// Assets

export const ToggleInputLogic = ({ className, enableEdit }) => {
	const [toggleInputContainerClassName, setToggleInputContainerClassName] = useState("toggle-input-container");

	useEffect(() => {
		function getToggleInputContainerClassName() {
			let newClassName = "toggle-input-container";
			if (enableEdit) newClassName += " toggle-input-container-enable-edit";
			if (className) newClassName += " " + className;
			return newClassName;
		}
		setToggleInputContainerClassName(getToggleInputContainerClassName());
	}, [className, enableEdit]);

	return { toggleInputContainerClassName };
};
