// Packages
import { useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const HierarchyLogic = () => {
	const [isDisplayingHierarchy, setIsDisplayingHierarchy] = useState(false);

	function toggleIsDisplayingHierarchy() {
		setIsDisplayingHierarchy((oldIsDisplayingHierarchy) => !oldIsDisplayingHierarchy);
	}

	return { isDisplayingHierarchy, toggleIsDisplayingHierarchy };
};
