import React, { createContext, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const RoutesContext = createContext();

const RoutesProvider = ({ children }) => {
	const domain = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.atlas-story.app";
	const [location, setLocation] = useState("/");
	const [locationParams, setParameters] = useState([]);
	const routerLocation = useLocation();
	const routerNavigate = useNavigate();

	useEffect(() => {
		setLocation(routerLocation.pathname);
		setParameters(
			routerLocation.search
				.substring(1)
				.split("&")
				.map((param) => {
					let value = param.split("=");
					const label = value.splice(0, 1)[0];
					return { label, value: value.join("=") };
				})
		);
	}, [routerLocation, setLocation, setParameters]);

	const changeLocation = useCallback(
		async (newLocation, openInNewWindow, reload) => {
			if (openInNewWindow) return window.open(domain + newLocation, "_blank");
			if (reload) {
				routerNavigate("");
				setTimeout(() => routerNavigate(newLocation), 100);
			} else {
				routerNavigate(newLocation);
			}
			setLocation(newLocation);
		},
		[domain, routerNavigate]
	);

	return <RoutesContext.Provider value={{ domain, location, locationParams, changeLocation }}>{children}</RoutesContext.Provider>;
};

export default RoutesProvider;
