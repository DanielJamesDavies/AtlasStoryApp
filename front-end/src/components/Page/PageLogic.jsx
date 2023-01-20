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
	const { uiTheme, fontSize, accentColour, accentHoverColour } = useContext(AppContext);
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
	});

	useEffect(() => {
		function getPageStyles() {
			setPageStyles({
				"--vh": window.innerHeight + "px",
				"--colour-accent": accentColour,
				"--colour-accent-hover": accentHoverColour,
			});
		}
		getPageStyles();
		window.addEventListener("resize", getPageStyles);
		return () => window.removeEventListener("resize", getPageStyles);
	}, [setPageStyles, accentColour, accentHoverColour]);

	return { pageClassName, pageStyles };
};
