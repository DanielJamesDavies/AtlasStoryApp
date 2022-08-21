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
	const { uiTheme, accentColour, accentHoverColour } = useContext(AppContext);
	const [pageStyles, setPageStyles] = useState({ "--accentColour": accentColour, "--accentHoverColour": accentHoverColour });

	useEffect(() => {
		let newPageStyles = { "--accentColour": accentColour, "--accentHoverColour": accentHoverColour };

		// UI Themes
		switch (uiTheme) {
			case "light":
				newPageStyles["--grey1"] = "#ffffff";
				newPageStyles["--grey1point5"] = "#dfdfdf";
				newPageStyles["--grey2"] = "#dadada";
				newPageStyles["--grey3"] = "#c8c8c8";
				newPageStyles["--grey4"] = "#bbbbbb";
				newPageStyles["--grey5"] = "#aaaaaa";
				newPageStyles["--textColour"] = "#000000";
				break;
			default:
				break;
		}

		setPageStyles(newPageStyles);
	}, [setPageStyles, uiTheme, accentColour, accentHoverColour]);

	return { pageStyles };
};
