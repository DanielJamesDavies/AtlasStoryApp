// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../SubstoryContext";

// Services
import isLightBackground from "../../../services/IsLightBackground";

// Styles

// Assets

export const SubstoryPrimaryLogic = () => {
	const { story, storyIcon, isOnOverviewSection, substoryOverviewBackground } = useContext(SubstoryContext);

	const [primaryStoryNameStyles, setPrimaryStoryNameStyles] = useState({});
	useEffect(() => {
		async function getPrimaryNameStyles() {
			if (!isOnOverviewSection) return setPrimaryStoryNameStyles({});
			if (!substoryOverviewBackground) setPrimaryStoryNameStyles({ color: "#fff" });
			const isDarkName = await isLightBackground(substoryOverviewBackground, [0, 40], [-1, 115]);
			setPrimaryStoryNameStyles({ color: isDarkName ? "#000" : "#fff" });
		}
		getPrimaryNameStyles();
	}, [substoryOverviewBackground, isOnOverviewSection, setPrimaryStoryNameStyles]);

	return { story, storyIcon, primaryStoryNameStyles };
};
