import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const RoutesContext = createContext();

const RoutesProvider = ({ children }) => {
	const domain = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.atlas-story.app";
	const [location, setLocation] = useState("/");
	const routerLocation = useLocation();
	const routerNavigate = useNavigate();

	useEffect(() => {
		setLocation(routerLocation.pathname + routerLocation.search);
	}, [routerLocation, setLocation]);

	async function changeLocation(newLocation, openInNewWindow, reload) {
		if (openInNewWindow) return window.open(domain + newLocation, "_blank");
		if (reload) {
			routerNavigate("");
			setTimeout(() => routerNavigate(newLocation), 100);
		} else {
			routerNavigate(newLocation);
		}
		setLocation(newLocation);
	}

	return <RoutesContext.Provider value={{ domain, location, changeLocation }}>{children}</RoutesContext.Provider>;
};

export default RoutesProvider;
