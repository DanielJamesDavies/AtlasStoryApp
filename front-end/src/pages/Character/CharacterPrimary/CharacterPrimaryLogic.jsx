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
	const { story, storyIcon, isOnOverviewSection, characterOverviewBackground } = useContext(CharacterContext);
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

	return { story, storyIcon, primaryStoryNameStyles };
};
