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

	const updateRouterLocation = useCallback(
		(input_location, input_params) => {
			const newLocation = JSON.parse(JSON.stringify(input_location));
			const newParameters = JSON.parse(JSON.stringify(input_params));
			routerNavigate(
				newLocation + (newParameters.length === 0 ? "" : "?" + newParameters.map(({ label, value }) => `${label}=${value}`).join("&"))
			);
		},
		[routerNavigate]
	);

	const changeLocation = useCallback(
		async (newLocation, openInNewWindow, reload) => {
			if (openInNewWindow) return window.open(domain + newLocation, "_blank");
			if (reload) {
				routerNavigate("");
				setTimeout(() => updateRouterLocation(newLocation, parameters), 100);
			} else {
				updateRouterLocation(newLocation, parameters);
			}
			setLocation(newLocation);
			updateRouterLocation(newLocation, parameters);
		},
		[domain, routerNavigate, updateRouterLocation, parameters]
	);

	const changeLocationParameters = useCallback(
		async (inputParameters) => {
			const newParameters = JSON.parse(JSON.stringify(inputParameters));
			setParameters(newParameters);
			updateRouterLocation(location, newParameters);
			locationParams.current = JSON.parse(JSON.stringify(newParameters));
		},
		[setParameters, updateRouterLocation, location, locationParams]
	);

	return (
		<RoutesContext.Provider value={{ domain, location, locationParams, changeLocation, changeLocationParameters }}>
			{children}
		</RoutesContext.Provider>
	);
};

export default RoutesProvider;
