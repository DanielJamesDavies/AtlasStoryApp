// Packages
import { useEffect } from "react";
import { useState } from "react";

// Components

// Logic

// Context

// Styles

// Assets

export const OpenableComponentLogic = ({ className, defaultShowValue, isDisplaying, onlyOnMobile, showTitleOnlyOnMobile }) => {
	const [openableComponentlassName, setOpenableComponentlassName] = useState(
		className ? "openable-component-container " + className : "openable-component-container"
	);
	const [isOpen, setIsOpen] = useState(defaultShowValue === undefined ? false : defaultShowValue);

	function toggleIsOpen() {
		setIsOpen((oldIsOpen) => !oldIsOpen);
	}

	useEffect(() => {
		function getOpenableComponentlassName() {
			let newClassName = "openable-component-container";
			if (isOpen) newClassName += " openable-component-container-is-open";
			if (isDisplaying === false) newClassName += " openable-component-container-hide";
			if (onlyOnMobile) newClassName += " openable-component-container-only-on-mobile";
			if (showTitleOnlyOnMobile) newClassName += " openable-component-container-show-title-only-on-mobile";
			if (className) newClassName += " " + className;
			setOpenableComponentlassName(newClassName);
		}
		getOpenableComponentlassName();
	}, [setOpenableComponentlassName, className, isDisplaying, onlyOnMobile, showTitleOnlyOnMobile, isOpen]);

	return { openableComponentlassName, isOpen, toggleIsOpen };
};
