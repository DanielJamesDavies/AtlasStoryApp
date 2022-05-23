import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import { APIContext } from "./APIContext";

export const RoutesContext = createContext();

const RoutesProvider = ({ children }) => {
	const [location, setLocation] = useState("/");
	const { isOnElectron } = useContext(AppContext);
	const { authorized } = useContext(APIContext);
	const routerLocation = useLocation();
	const routerNavigate = useNavigate();

	useEffect(() => {
		if (!isOnElectron) setLocation(routerLocation.pathname);
	}, [isOnElectron, routerLocation, setLocation]);

	useEffect(() => {
		const unauthorizedPages = ["/", "/login/", "/register/"];
		if (!authorized && unauthorizedPages.findIndex((e) => e === location || e === location + "/") === -1) {
			routerNavigate("/login");
			setLocation("/login");
		}
	}, [location, authorized, routerNavigate, setLocation]);

	function changeLocation(newLocation) {
		routerNavigate(newLocation);
		setLocation(newLocation);
	}

	return <RoutesContext.Provider value={{ location, changeLocation }}>{children}</RoutesContext.Provider>;
};

export default RoutesProvider;
