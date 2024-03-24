// Packages
import { useState } from "react";

// Components

// Logic

// Context

// Styles

// Assets

export const OpenableComponentLogic = ({ defaultShowValue, onClick }) => {
	const [isOpen, setIsOpen] = useState(defaultShowValue === undefined ? false : defaultShowValue);

	function toggleIsOpen(e) {
		setIsOpen((oldIsOpen) => !oldIsOpen);
		if (onClick !== undefined) onClick(e);
	}

	return { isOpen, toggleIsOpen };
};
