// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../LocationContext";
import { AppContext } from "../../../context/AppContext";

// Services
import isLightBackground from "../../../services/IsLightBackground";

// Styles

// Assets

export const LocationPrimaryLogic = () => {
	const { story, storyIcon, isOnOverviewSection, setIsOnOverviewSection, locationOverviewBackground } = useContext(LocationContext);
	const { uiTheme } = useContext(AppContext);

	const [primaryStoryStyles, setPrimaryStoryStyles] = useState({});
	useEffect(() => {
		async function getTextColour() {
			let text_colour = "#fff";
			if (!isOnOverviewSection) return text_colour;
			if (!locationOverviewBackground) {
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
			const isDarkName = await isLightBackground(locationOverviewBackground, [0, 40], [-1, 115]);
			text_colour = isDarkName ? "#000" : "#fff";
			return text_colour;
		}

		async function getPrimaryStyles() {
			let newPrimaryStoryStyles = {};
			newPrimaryStoryStyles["--text-colour-primary"] = await getTextColour();
			setPrimaryStoryStyles(newPrimaryStoryStyles);
		}
		getPrimaryStyles();
	}, [locationOverviewBackground, isOnOverviewSection, setPrimaryStoryStyles, uiTheme]);

	function toOverviewSection() {
		setIsOnOverviewSection(true);
	}

	function toSubpagesSection() {
		setIsOnOverviewSection(false);
	}

	return { story, storyIcon, primaryStoryStyles, toOverviewSection, toSubpagesSection };
};
