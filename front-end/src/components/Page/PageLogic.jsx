// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { AppContext } from "../../context/AppContext";

// Services

// Styles

// Assets

export const PageLogic = () => {
	const { uiTheme, fontSizeMultiplier, accentColour, accentHoverColour } = useContext(AppContext);
	const [pageStyles, setPageStyles] = useState({
		"--vh": window.innerHeight + "px",
		"--accentColour": accentColour,
		"--accentHoverColour": accentHoverColour,
		"--fontSizeMultiplier": fontSizeMultiplier,
	});

	useEffect(() => {
		function getPageStyles() {
			let newPageStyles = {
				"--vh": window.innerHeight + "px",
				"--accentColour": accentColour,
				"--accentHoverColour": accentHoverColour,
				"--fontSizeMultiplier": fontSizeMultiplier,
			};

			// UI Themes
			switch (uiTheme) {
				case "light":
					newPageStyles["--grey1"] = "#f0f0ff";
					newPageStyles["--grey1point5"] = "#eaeaef";
					newPageStyles["--grey2"] = "#ddddef";
					newPageStyles["--grey2point5"] = "#d0d0df";
					newPageStyles["--grey3"] = "#cfcfdf";
					newPageStyles["--grey4"] = "#c2c2d2";
					newPageStyles["--grey5"] = "#aaaaaa";
					newPageStyles["--textColour"] = "#000000";
					break;
				default:
					break;
			}

			setPageStyles(newPageStyles);
		}
		getPageStyles();
		window.addEventListener("resize", getPageStyles);
		return () => window.removeEventListener("resize", getPageStyles);
	}, [setPageStyles, uiTheme, fontSizeMultiplier, accentColour, accentHoverColour]);

	return { pageStyles };
};
