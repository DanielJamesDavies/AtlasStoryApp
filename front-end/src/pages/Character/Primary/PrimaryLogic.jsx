// Packages
import { useContext, useState, useRef, useEffect } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../CharacterContext";

// Services
import isLightBackground from "../../../services/IsLightBackground";
import { AppContext } from "../../../context/AppContext";

// Styles

// Assets

export const CharacterPrimaryLogic = ({ characterPrimaryRef }) => {
	const { story, storyIcon, isOnOverviewSection, characterOverviewBackground, setIsOnOverviewSection } = useContext(CharacterContext);
	const { uiTheme } = useContext(AppContext);
	const [primaryStoryStyles, setPrimaryStoryStyles] = useState({});
	const characterPrimaryVersionRef = useRef();

	useEffect(() => {
		async function getPrimaryStyles() {
			let newPrimaryStoryStyles = {};
			newPrimaryStoryStyles["--text-colour-primary"] = await getTextColour();
			newPrimaryStoryStyles["minHeight"] = getHeight();
			newPrimaryStoryStyles["--characterPrimaryMinHeight"] = getHeight();
			setPrimaryStoryStyles(newPrimaryStoryStyles);
		}

		async function getTextColour() {
			let text_colour = "#fff";
			if (!isOnOverviewSection) return text_colour;
			if (!characterOverviewBackground) {
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
			const isDarkName = await isLightBackground(characterOverviewBackground, [0, 40], [-1, 115]);
			text_colour = isDarkName ? "#000" : "#fff";
			return text_colour;
		}

		function getHeight() {
			return Math.max(characterPrimaryRef?.current?.children[1]?.clientHeight, characterPrimaryVersionRef?.current?.clientHeight);
		}

		getPrimaryStyles();
		window.addEventListener("resize", getPrimaryStyles);
		return () => window.removeEventListener("resize", getPrimaryStyles);
	}, [characterOverviewBackground, isOnOverviewSection, setPrimaryStoryStyles, characterPrimaryRef, characterPrimaryVersionRef, uiTheme]);

	function toOverviewSection() {
		setIsOnOverviewSection(true);
	}

	function toSubpagesSection() {
		setIsOnOverviewSection(false);
	}

	return { story, storyIcon, characterPrimaryVersionRef, primaryStoryStyles, toOverviewSection, toSubpagesSection };
};
