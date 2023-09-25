// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../UnitPageContext";

// Services

// Styles

// Assets

export const SectionSwitcherLogic = () => {
	const { isOnOverviewSection, setIsOnOverviewSection } = useContext(UnitPageContext);

	function toggleIsOnOverviewSection() {
		setIsOnOverviewSection((oldIsOnOverviewSection) => !oldIsOnOverviewSection);
	}

	return { isOnOverviewSection, toggleIsOnOverviewSection };
};
