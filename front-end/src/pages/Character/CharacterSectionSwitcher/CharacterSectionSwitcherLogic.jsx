// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../CharacterContext";

// Services

// Styles

// Assets

export const CharacterSectionSwitcherLogic = () => {
	const { isOnOverviewSection, setIsOnOverviewSection } = useContext(CharacterContext);

	function toggleIsOnOverviewSection() {
		setIsOnOverviewSection((oldIsOnOverviewSection) => !oldIsOnOverviewSection);
	}

	return { isOnOverviewSection, toggleIsOnOverviewSection };
};
