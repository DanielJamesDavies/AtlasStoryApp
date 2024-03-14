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
	const { uiTheme, fontSize, accentColour, accentHoverColour, accentHSL_H } = useContext(AppContext);
	const [pageClassName, setPageClassName] = useState("page theme-dark");

	useEffect(() => {
		function getPageClassName() {
			let newPageClassName = "page";
			newPageClassName += " theme-" + uiTheme;
			newPageClassName += " font-size-" + fontSize;
			setPageClassName(newPageClassName);
		}
		getPageClassName();
	}, [setPageClassName, uiTheme, fontSize]);

	const [pageStyles, setPageStyles] = useState({
		"--vh": window.innerHeight + "px",
		"--colour-accent": accentColour,
		"--colour-accent-hover": accentHoverColour,
		"--colour-accent-hsl-h": accentHSL_H,
	});

	useEffect(() => {
		function getPageStyles() {
			setPageStyles({
				"--vh": window.innerHeight + "px",
				"--colour-accent": accentColour,
				"--colour-accent-hover": accentHoverColour,
				"--colour-accent-hsl-h": accentHSL_H,
			});
		}
		getPageStyles();
		window.addEventListener("resize", getPageStyles);
		return () => window.removeEventListener("resize", getPageStyles);
	}, [setPageStyles, accentColour, accentHoverColour, accentHSL_H]);

	return { pageClassName, pageStyles };
};
