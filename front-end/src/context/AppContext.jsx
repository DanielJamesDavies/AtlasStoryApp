import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "./APIContext";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
	const { username } = useContext(APIContext);
	const [uiTheme, setUITheme] = useState("dim");
	const [fontSize, setFontSize] = useState("m");
	const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
	const defaultAccentColour = "#0044ff";
	const defaultAccentHoverColour = "#0088ff";
	const [accentColour, setAccentColour] = useState(defaultAccentColour);
	const [accentHoverColour, setAccentHoverColour] = useState(defaultAccentHoverColour);

	useEffect(() => {
		if (username === false) {
			setUITheme("dim");
			setFontSize("m");
		}
	}, [username, setUITheme, setFontSize]);

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
				fontSize,
				setFontSize,
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
