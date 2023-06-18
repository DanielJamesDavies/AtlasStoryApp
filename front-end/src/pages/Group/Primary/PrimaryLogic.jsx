// Packages
import { useContext, useState, useRef, useEffect } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../GroupContext";
import { AppContext } from "../../../context/AppContext";

// Services
import isLightBackground from "../../../services/IsLightBackground";

// Styles

// Assets

export const GroupPrimaryLogic = ({ groupPrimaryRef }) => {
	const { story, storyIcon, isOnOverviewSection, groupOverviewBackground, setIsOnOverviewSection } = useContext(GroupContext);
	const { uiTheme } = useContext(AppContext);
	const [primaryStoryStyles, setPrimaryStoryStyles] = useState({});
	const groupPrimaryVersionRef = useRef();

	useEffect(() => {
		async function getPrimaryStyles() {
			let newPrimaryStoryStyles = {};
			newPrimaryStoryStyles["--text-colour-primary"] = await getTextColour();
			newPrimaryStoryStyles["minHeight"] = getHeight();
			newPrimaryStoryStyles["--groupPrimaryMinHeight"] = getHeight();
			setPrimaryStoryStyles(newPrimaryStoryStyles);
		}

		async function getTextColour() {
			let text_colour = "#fff";
			if (!isOnOverviewSection) return text_colour;
			if (!groupOverviewBackground) {
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
			const isDarkName = await isLightBackground(groupOverviewBackground, [0, 40], [-1, 115]);
			text_colour = isDarkName ? "#000" : "#fff";
			return text_colour;
		}

		function getHeight() {
			return Math.max(groupPrimaryRef?.current?.children[1]?.clientHeight, groupPrimaryVersionRef?.current?.clientHeight);
		}

		getPrimaryStyles();
		window.addEventListener("resize", getPrimaryStyles);
		return () => window.removeEventListener("resize", getPrimaryStyles);
	}, [groupOverviewBackground, isOnOverviewSection, setPrimaryStoryStyles, groupPrimaryRef, groupPrimaryVersionRef, uiTheme]);

	function toOverviewSection() {
		setIsOnOverviewSection(true);
	}

	function toSubpagesSection() {
		setIsOnOverviewSection(false);
	}

	return { story, storyIcon, groupPrimaryVersionRef, primaryStoryStyles, toOverviewSection, toSubpagesSection };
};
