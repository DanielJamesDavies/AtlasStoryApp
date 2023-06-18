// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../SubstoryContext";
import { AppContext } from "../../../context/AppContext";

// Services
import isLightBackground from "../../../services/IsLightBackground";

// Styles

// Assets

export const SubstoryPrimaryLogic = () => {
	const { story, storyIcon, isOnOverviewSection, setIsOnOverviewSection, substoryOverviewBackground } = useContext(SubstoryContext);
	const { uiTheme } = useContext(AppContext);

	const [primaryStoryStyles, setPrimaryStoryStyles] = useState({});
	useEffect(() => {
		async function getTextColour() {
			let text_colour = "#fff";
			if (!isOnOverviewSection) return text_colour;
			if (!substoryOverviewBackground) {
				switch (uiTheme) {
					case "light":
						text_colour = "#000";
						break;
					default:
						text_colour = "#fff";
						break;
				}
				return text_colour;
			}
			const isDarkName = await isLightBackground(substoryOverviewBackground, [0, 40], [-1, 115]);
			text_colour = isDarkName ? "#000" : "#fff";
			return text_colour;
		}

		async function getPrimaryStyles() {
			let newPrimaryStoryStyles = {};
			newPrimaryStoryStyles["--text-colour-primary"] = await getTextColour();
			setPrimaryStoryStyles(newPrimaryStoryStyles);
		}
		getPrimaryStyles();
	}, [substoryOverviewBackground, isOnOverviewSection, setPrimaryStoryStyles, uiTheme]);

	function toOverviewSection() {
		setIsOnOverviewSection(true);
	}

	function toSubpagesSection() {
		setIsOnOverviewSection(false);
	}

	return { story, storyIcon, primaryStoryStyles, toOverviewSection, toSubpagesSection };
};
