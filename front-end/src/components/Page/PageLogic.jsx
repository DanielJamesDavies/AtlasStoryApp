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
	const [pageClassName, setPageClassName] = useState("page theme-dark");

	useEffect(() => {
		function getPageClassName() {
			let newPageClassName = "page";
			newPageClassName += " theme-" + uiTheme;
			setPageClassName(newPageClassName);
		}
		getPageClassName();
	}, [setPageClassName, uiTheme]);

	const [pageStyles, setPageStyles] = useState({
		"--vh": window.innerHeight + "px",
		"--accentColour": accentColour,
		"--accentHoverColour": accentHoverColour,
		"--fontSizeMultiplier": fontSizeMultiplier,
	});

	useEffect(() => {
		function getPageStyles() {
			setPageStyles({
				"--vh": window.innerHeight + "px",
				"--accentColour": accentColour,
				"--accentHoverColour": accentHoverColour,
				"--fontSizeMultiplier": fontSizeMultiplier,
			});
		}
		getPageStyles();
		window.addEventListener("resize", getPageStyles);
		return () => window.removeEventListener("resize", getPageStyles);
	}, [setPageStyles, fontSizeMultiplier, accentColour, accentHoverColour]);

	return { pageClassName, pageStyles };
};
