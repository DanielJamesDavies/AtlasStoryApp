import React, { createContext, useCallback, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const RoutesContext = createContext();

const RoutesProvider = ({ children }) => {
	const domain = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.atlas-story.app";
	const [location, setLocation] = useState("/");
	const [parameters, setParameters] = useState([]);
	const locationParams = useRef([]);
	const routerLocation = useLocation();
	const routerNavigate = useNavigate();

	useEffect(() => {
		setLocation(routerLocation.pathname);

		const newParameters = routerLocation.search
			.substring(1)
			.split("&")
			.filter((e) => e !== "=")
			.map((param) => {
				let value = param.split("=");
				const label = value.splice(0, 1)[0];
				return { label, value: value.join("=") };
			});
		setParameters(newParameters);
		locationParams.current = newParameters;
	}, [routerLocation, setLocation, setParameters, locationParams]);

	const getNewURL = useCallback((newLocation, newParameters) => {
		return newLocation + (newParameters.length === 0 ? "" : "?" + newParameters.map(({ label, value }) => `${label}=${value}`).join("&"));
	}, []);

	const changeLocation = useCallback(
		async (newLocation, openInNewWindow, reload) => {
			if (openInNewWindow) return window.open(domain + newLocation, "_blank");
			if (reload) {
				routerNavigate("");
				setTimeout(() => routerNavigate(getNewURL(newLocation, parameters)), 100);
			} else {
				routerNavigate(getNewURL(newLocation, parameters));
			}
			setLocation(newLocation);
			window.history.replaceState("", "", getNewURL(newLocation, parameters));
		},
		[domain, routerNavigate, parameters, getNewURL]
	);

	const changeLocationParameters = useCallback(
		async (inputParameters) => {
			const newParameters = JSON.parse(JSON.stringify(inputParameters));
			setParameters(newParameters);
			locationParams.current = JSON.parse(JSON.stringify(newParameters));
			window.history.replaceState("", "", getNewURL(location, newParameters));
		},
		[setParameters, location, locationParams, getNewURL]
	);

	return (
		<RoutesContext.Provider value={{ domain, location, locationParams, changeLocation, changeLocationParameters }}>
			{children}
		</RoutesContext.Provider>
	);
};

export default RoutesProvider;
