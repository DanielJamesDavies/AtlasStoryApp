// Packages
import { useContext, useState, useRef, useEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../UnitPageContext";

// Services
import isLightBackground from "../../../services/IsLightBackground";
import { AppContext } from "../../../context/AppContext";

// Styles

// Assets

export const PrimaryLogic = () => {
	const { unit_type, unitPagePrimaryRef, isOnOverviewSection, unitOverviewBackground, setIsOnOverviewSection } = useContext(UnitPageContext);
	const { uiTheme } = useContext(AppContext);
	const [primaryStoryStyles, setPrimaryStoryStyles] = useState({});
	const unitPagePrimaryVersionRef = useRef();

	useEffect(() => {
		async function getPrimaryStyles() {
			let newPrimaryStoryStyles = {};
			newPrimaryStoryStyles["--text-colour-primary"] = await getTextColour();
			newPrimaryStoryStyles["minHeight"] = getHeight();
			newPrimaryStoryStyles["--unitPagePrimaryMinHeight"] = getHeight();
			setPrimaryStoryStyles(newPrimaryStoryStyles);
		}

		async function getTextColour() {
			let text_colour = "#fff";
			if (!isOnOverviewSection) return text_colour;
			if (!unitOverviewBackground) {
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
			const isDarkName = await isLightBackground(unitOverviewBackground, [0, 40], [-1, 115]);
			text_colour = isDarkName ? "#000" : "#fff";
			return text_colour;
		}

		function getHeight() {
			if (["character"].includes(unit_type) && unitPagePrimaryVersionRef?.current) {
				return Math.max(unitPagePrimaryRef?.current?.children[1]?.clientHeight, unitPagePrimaryVersionRef?.current?.clientHeight);
			} else {
				return unitPagePrimaryRef?.current?.children[1]?.clientHeight;
			}
		}

		getPrimaryStyles();
		window.addEventListener("resize", getPrimaryStyles);
		return () => window.removeEventListener("resize", getPrimaryStyles);
	}, [unit_type, unitOverviewBackground, isOnOverviewSection, setPrimaryStoryStyles, unitPagePrimaryRef, unitPagePrimaryVersionRef, uiTheme]);

	function toOverviewSection() {
		setIsOnOverviewSection(true);
	}

	function toSubpagesSection() {
		setIsOnOverviewSection(false);
	}

	return { unit_type, unitPagePrimaryRef, unitPagePrimaryVersionRef, primaryStoryStyles, toOverviewSection, toSubpagesSection };
};
