// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../GroupContext";

// Services

// Styles

// Assets

export const GroupSectionSwitcherLogic = () => {
	const { isOnOverviewSection, setIsOnOverviewSection } = useContext(GroupContext);

	function toggleIsOnOverviewSection() {
		setIsOnOverviewSection((oldIsOnOverviewSection) => !oldIsOnOverviewSection);
	}

	return { isOnOverviewSection, toggleIsOnOverviewSection };
};
