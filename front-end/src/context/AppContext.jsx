import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [isOnElectron, setIsOnElectron] = useState(false);
	const defaultAccentColour = "#0044ff";
	const defaultAccentHoverColour = "#0088ff";
	const [accentColour, setAccentColour] = useState(defaultAccentColour);
	const [accentHoverColour, setAccentHoverColour] = useState(defaultAccentHoverColour);

	useEffect(() => {
		const currIsOnElectron = localStorage.getItem("isOnElectron");
		if (!currIsOnElectron) return;
		if (parseInt(currIsOnElectron) === 1) setIsOnElectron(true);
	}, []);

	function changeAccentColour(newAccentColour) {
		if (newAccentColour === "default") return setAccentColour(defaultAccentColour);
		setAccentColour(newAccentColour);
	}

	function changeAccentHoverColour(newaccentHoverColour) {
		if (newaccentHoverColour === "default") return setAccentHoverColour(defaultAccentHoverColour);
		setAccentHoverColour(newaccentHoverColour);
	}

	return (
		<AppContext.Provider value={{ isOnElectron, accentColour, accentHoverColour, changeAccentColour, changeAccentHoverColour }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
