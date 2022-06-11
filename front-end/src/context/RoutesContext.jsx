import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const RoutesContext = createContext();

const RoutesProvider = ({ children }) => {
	const [location, setLocation] = useState("/");
	const routerLocation = useLocation();
	const routerNavigate = useNavigate();

	useEffect(() => {
		setLocation(routerLocation.pathname);
	}, [routerLocation, setLocation]);

	function changeLocation(newLocation) {
		routerNavigate(newLocation);
		setLocation(newLocation);
	}

	return <RoutesContext.Provider value={{ location, changeLocation }}>{children}</RoutesContext.Provider>;
};

export default RoutesProvider;
