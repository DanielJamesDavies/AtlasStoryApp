// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { DropdownContext } from "../../context/DropdownContext";

// Services

// Styles

// Assets

export const DropdownContainerLogic = ({ children, className, seamless, onChange, includeUnselectedOption, enableEdit }) => {
	const { dropdownContainerRef, dropdownChildren, setDropdownChildren, setOnDropdownChange, setIncludeUnselectedOption, closeDropdown } =
		useContext(DropdownContext);

	const [isDisplaying, setIsDisplaying] = useState(false);

	useEffect(() => {
		setIsDisplaying(false);
	}, [dropdownChildren]);

	function toggleDropdownOptions() {
		const newIsDisplaying = !JSON.parse(JSON.stringify(isDisplaying));
		setTimeout(() => setIsDisplaying(newIsDisplaying), 50);

		if (!newIsDisplaying) return closeDropdown();

		setOnDropdownChange({ onChange });
		setIncludeUnselectedOption(includeUnselectedOption);
		setDropdownChildren(children);
	}

	const [dropdownContainerClassName, setDropdownContainerClassName] = useState("dropdown-container dropdown-container-seamless");

	useEffect(() => {
		function getDropdownContainerClassName() {
			let newClassName = "dropdown-container";
			if (seamless) newClassName += " dropdown-container-seamless";
			if (isDisplaying) newClassName += " dropdown-container-is-selecting";
			if (enableEdit === false) newClassName += " dropdown-container-disable-edit";
			if (className) newClassName += " " + className;
			return newClassName;
		}
		setDropdownContainerClassName(getDropdownContainerClassName());
	}, [setDropdownContainerClassName, className, seamless, isDisplaying, enableEdit]);

	return { isDisplaying, dropdownContainerRef, dropdownContainerClassName, toggleDropdownOptions };
};
