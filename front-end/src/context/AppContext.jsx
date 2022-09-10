import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [uiTheme, setUITheme] = useState("dark");
	const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
	const defaultAccentColour = "#0044ff";
	const defaultAccentHoverColour = "#0088ff";
	const [accentColour, setAccentColour] = useState(defaultAccentColour);
	const [accentHoverColour, setAccentHoverColour] = useState(defaultAccentHoverColour);

	function changeAccentColour(newAccentColour) {
		if (newAccentColour === "default") return setAccentColour(defaultAccentColour);
		setAccentColour(newAccentColour);
	}

	function changeAccentHoverColour(newaccentHoverColour) {
		if (newaccentHoverColour === "default") return setAccentHoverColour(defaultAccentHoverColour);
		setAccentHoverColour(newaccentHoverColour);
	}

	return (
		<AppContext.Provider
			value={{
				uiTheme,
				setUITheme,
				fontSizeMultiplier,
				setFontSizeMultiplier,
				accentColour,
				accentHoverColour,
				changeAccentColour,
				changeAccentHoverColour,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
