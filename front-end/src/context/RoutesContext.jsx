import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const RoutesContext = createContext();

const RoutesProvider = ({ children }) => {
	const [location, setLocation] = useState("/");
	const routerLocation = useLocation();
	const routerNavigate = useNavigate();
	const domain = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.atlas-story.app";

	useEffect(() => {
		setLocation(routerLocation.pathname + routerLocation.search);
	}, [routerLocation, setLocation]);

	function changeLocation(newLocation, openInNewWindow) {
		if (openInNewWindow) return window.open(domain + newLocation, "_blank");
		routerNavigate(newLocation);
		setLocation(newLocation);
	}

	return <RoutesContext.Provider value={{ location, changeLocation }}>{children}</RoutesContext.Provider>;
};

export default RoutesProvider;
