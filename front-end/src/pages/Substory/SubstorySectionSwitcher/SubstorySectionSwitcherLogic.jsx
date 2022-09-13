// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../SubstoryContext";

// Services

// Styles

// Assets

export const SubstorySectionSwitcherLogic = () => {
	const { isOnOverviewSection, setIsOnOverviewSection } = useContext(SubstoryContext);

	function toggleIsOnOverviewSection() {
		setIsOnOverviewSection((oldIsOnOverviewSection) => !oldIsOnOverviewSection);
	}

	return { isOnOverviewSection, toggleIsOnOverviewSection };
};
