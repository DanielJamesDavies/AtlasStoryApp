// Packages
import { useContext, useState, useRef, useEffect } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../CharacterContext";

// Services
import isLightBackground from "../../../services/IsLightBackground";

// Styles

// Assets

export const CharacterPrimaryLogic = ({ characterPrimaryRef }) => {
	const { story, storyIcon, isOnOverviewSection, characterOverviewBackground, setIsOnOverviewSection } = useContext(CharacterContext);
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
			if (!isOnOverviewSection || !characterOverviewBackground) return "#fff";
			const isDarkName = await isLightBackground(characterOverviewBackground, [0, 40], [-1, 115]);
			return isDarkName ? "#000" : "#fff";
		}

		function getHeight() {
			return Math.max(characterPrimaryRef?.current?.children[1]?.clientHeight, characterPrimaryVersionRef?.current?.clientHeight);
		}

		getPrimaryStyles();
		window.addEventListener("resize", getPrimaryStyles);
		return () => window.removeEventListener("resize", getPrimaryStyles);
	}, [characterOverviewBackground, isOnOverviewSection, setPrimaryStoryStyles, characterPrimaryRef, characterPrimaryVersionRef]);

	function toOverviewSection() {
		setIsOnOverviewSection(true);
	}

	function toSubpagesSection() {
		setIsOnOverviewSection(false);
	}

	return { story, storyIcon, characterPrimaryVersionRef, primaryStoryStyles, toOverviewSection, toSubpagesSection };
};
