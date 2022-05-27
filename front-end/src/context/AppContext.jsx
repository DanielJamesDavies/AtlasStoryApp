import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [isOnElectron, setIsOnElectron] = useState(false);
	const defaultAccentColour = "#0044ff";
	const defaultAccentColourHover = "#0088ff";
	const [accentColour, setAccentColour] = useState(defaultAccentColour);
	const [accentColourHover, setAccentColourHover] = useState(defaultAccentColourHover);

	useEffect(() => {
		const currIsOnElectron = localStorage.getItem("isOnElectron");
		if (!currIsOnElectron) return;
		if (parseInt(currIsOnElectron) === 1) setIsOnElectron(true);
	}, []);

	function changeAccentColour(newAccentColour) {
		if (newAccentColour === "default") return setAccentColour(defaultAccentColour);
		setAccentColour(newAccentColour);
	}

	function changeAccentColourHover(newAccentColourHover) {
		if (newAccentColourHover === "default") return setAccentColourHover(defaultAccentColourHover);
		setAccentColourHover(newAccentColourHover);
	}

	return (
		<AppContext.Provider value={{ isOnElectron, accentColour, accentColourHover, changeAccentColour, changeAccentColourHover }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
