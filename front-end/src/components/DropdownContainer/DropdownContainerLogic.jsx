// Packages
import { useEffect, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const DropdownContainerLogic = ({ className, seamless, onChange }) => {
	const [isSelecting, setIsSelecting] = useState(false);

	const [dropdownContainerClassName, setDropdownContainerClassName] = useState("dropdown-container dropdown-container-seamless");

	useEffect(() => {
		function getDropdownContainerClassName() {
			let newClassName = "dropdown-container";
			if (seamless) newClassName += " dropdown-container-seamless";
			if (isSelecting) newClassName += " dropdown-container-is-selecting";
			if (className) newClassName += " " + className;
			return newClassName;
		}
		setDropdownContainerClassName(getDropdownContainerClassName());
	}, [setDropdownContainerClassName, className, seamless, isSelecting]);

	function selectChild(e, index) {
		e.preventDefault();
		e.stopPropagation();
		if (onChange) onChange(index);
	}

	return { isSelecting, setIsSelecting, dropdownContainerClassName, selectChild };
};
