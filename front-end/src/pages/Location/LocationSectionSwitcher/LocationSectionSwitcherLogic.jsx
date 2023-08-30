// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../LocationContext";

// Services

// Styles

// Assets

export const LocationSectionSwitcherLogic = () => {
	const { isOnOverviewSection, setIsOnOverviewSection } = useContext(LocationContext);

	function toggleIsOnOverviewSection() {
		setIsOnOverviewSection((oldIsOnOverviewSection) => !oldIsOnOverviewSection);
	}

	return { isOnOverviewSection, toggleIsOnOverviewSection };
};
