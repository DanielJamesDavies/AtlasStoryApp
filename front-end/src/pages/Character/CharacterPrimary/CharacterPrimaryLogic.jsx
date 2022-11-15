// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../CharacterContext";

// Services
import isLightBackground from "../../../services/IsLightBackground";

// Styles

// Assets

export const CharacterPrimaryLogic = () => {
	const { story, storyIcon, isOnOverviewSection, characterOverviewBackground, setIsOnOverviewSection } = useContext(CharacterContext);
	const [primaryStoryNameStyles, setPrimaryStoryNameStyles] = useState({});

	useEffect(() => {
		async function getPrimaryNameStyles() {
			if (!isOnOverviewSection) return setPrimaryStoryNameStyles({});
			if (!characterOverviewBackground) setPrimaryStoryNameStyles({ color: "#fff" });
			const isDarkName = await isLightBackground(characterOverviewBackground, [0, 40], [-1, 115]);
			setPrimaryStoryNameStyles({ color: isDarkName ? "#000" : "#fff" });
		}
		getPrimaryNameStyles();
	}, [characterOverviewBackground, isOnOverviewSection, setPrimaryStoryNameStyles]);

	function toOverviewSection() {
		setIsOnOverviewSection(true);
	}

	function toSubpagesSection() {
		setIsOnOverviewSection(false);
	}

	return { story, storyIcon, primaryStoryNameStyles, toOverviewSection, toSubpagesSection };
};
