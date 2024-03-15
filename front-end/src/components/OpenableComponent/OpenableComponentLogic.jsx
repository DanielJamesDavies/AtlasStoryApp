// Packages
import { useState } from "react";

// Components

// Logic

// Context

// Styles

// Assets

export const OpenableComponentLogic = ({ defaultShowValue }) => {
	const [isOpen, setIsOpen] = useState(defaultShowValue === undefined ? false : defaultShowValue);

	function toggleIsOpen() {
		setIsOpen((oldIsOpen) => !oldIsOpen);
	}

	return { isOpen, toggleIsOpen };
};
