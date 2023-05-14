// Packages
import { useContext, useState, useRef, useEffect } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../GroupContext";

// Services
import isLightBackground from "../../../services/IsLightBackground";

// Styles

// Assets

export const GroupPrimaryLogic = ({ groupPrimaryRef }) => {
	const { story, storyIcon, isOnOverviewSection, groupOverviewBackground, setIsOnOverviewSection } = useContext(GroupContext);
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
			if (!isOnOverviewSection || !groupOverviewBackground) return "#fff";
			const isDarkName = await isLightBackground(groupOverviewBackground, [0, 40], [-1, 115]);
			return isDarkName ? "#000" : "#fff";
		}

		function getHeight() {
			return Math.max(groupPrimaryRef?.current?.children[1]?.clientHeight, groupPrimaryVersionRef?.current?.clientHeight);
		}

		getPrimaryStyles();
		window.addEventListener("resize", getPrimaryStyles);
		return () => window.removeEventListener("resize", getPrimaryStyles);
	}, [groupOverviewBackground, isOnOverviewSection, setPrimaryStoryStyles, groupPrimaryRef, groupPrimaryVersionRef]);

	function toOverviewSection() {
		setIsOnOverviewSection(true);
	}

	function toSubpagesSection() {
		setIsOnOverviewSection(false);
	}

	return { story, storyIcon, groupPrimaryVersionRef, primaryStoryStyles, toOverviewSection, toSubpagesSection };
};
