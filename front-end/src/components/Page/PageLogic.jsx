// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { AppContext } from "../../context/AppContext";

// Services

// Styles

// Assets

export const PageLogic = () => {
	const { uiTheme, fontSize, accentColour, accentHoverColour, accentHSL_H } = useContext(AppContext);

	return { uiTheme, fontSize, accentColour, accentHoverColour, accentHSL_H };
};
