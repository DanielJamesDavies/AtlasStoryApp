import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [isOnElectron, setIsOnElectron] = useState(false);

	useEffect(() => {
		const currIsOnElectron = localStorage.getItem("isOnElectron");
		if (!currIsOnElectron) return;
		if (parseInt(currIsOnElectron) === 1) setIsOnElectron(true);
	}, []);

	return <AppContext.Provider value={{ isOnElectron }}>{children}</AppContext.Provider>;
};

export default AppProvider;
