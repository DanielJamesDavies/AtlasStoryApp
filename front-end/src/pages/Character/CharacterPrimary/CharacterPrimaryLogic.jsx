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
	const [primaryStoryStyles, setPrimaryStoryStyles] = useState({});

	useEffect(() => {
		async function getPrimaryStyles() {
			if (!isOnOverviewSection) return setPrimaryStoryStyles({ "--textColour": "#fff" });
			if (!characterOverviewBackground) setPrimaryStoryStyles({ "--textColour": "#fff" });
			const isDarkName = await isLightBackground(characterOverviewBackground, [0, 40], [-1, 115]);
			setPrimaryStoryStyles({ "--textColour": isDarkName ? "#000" : "#fff" });
		}
		getPrimaryStyles();
	}, [characterOverviewBackground, isOnOverviewSection, setPrimaryStoryStyles]);

	function toOverviewSection() {
		setIsOnOverviewSection(true);
	}

	function toSubpagesSection() {
		setIsOnOverviewSection(false);
	}

	return { story, storyIcon, primaryStoryStyles, toOverviewSection, toSubpagesSection };
};
