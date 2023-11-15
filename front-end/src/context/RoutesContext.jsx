import React, { createContext, useCallback, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const RoutesContext = createContext();

const RoutesProvider = ({ children }) => {
	const domain = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.atlas-story.app";
	const [location, setLocation] = useState("/");
	const [parameters, setParameters] = useState([]);
	const locationPath = useRef("");
	const locationParams = useRef([]);
	const routerLocation = useLocation();
	const routerNavigate = useNavigate();

	useEffect(() => {
		locationPath.current = routerLocation.pathname;
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
	}, [routerLocation, setLocation, locationPath, setParameters, locationParams]);

	const getNewURL = useCallback((newLocation, newParameters) => {
		return newLocation + (newParameters.length === 0 ? "" : "?" + newParameters.map(({ label, value }) => `${label}=${value}`).join("&"));
	}, []);

	const changeLocation = useCallback(
		async (newLocation, openInNewWindow, reload) => {
			const new_parameters = JSON.parse(JSON.stringify(parameters)).filter((e) => e.label.length !== 0 && e.value.length !== 0);
			if (openInNewWindow) return window.open(domain + newLocation, "_blank");
			if (reload) {
				routerNavigate("");
				setTimeout(() => routerNavigate(getNewURL(newLocation, new_parameters)), 100);
			} else {
				routerNavigate(getNewURL(newLocation, new_parameters));
			}
			locationPath.current = newLocation;
			setLocation(newLocation);
			window.history.replaceState("", "", getNewURL(newLocation, new_parameters));
		},
		[domain, routerNavigate, locationPath, parameters, getNewURL]
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

	const changeLocationAndParameters = useCallback(
		async (newLocation, inputParameters, openInNewWindow) => {
			if (openInNewWindow) {
				return window.open(domain + newLocation + "?" + inputParameters.map((e) => e?.label + "=" + e?.value).join("&"), "_blank");
			}
			const newParameters = JSON.parse(JSON.stringify(inputParameters));
			locationPath.current = newLocation;
			setLocation(newLocation);
			setParameters(newParameters);
			locationParams.current = JSON.parse(JSON.stringify(newParameters));
			window.history.replaceState("", "", getNewURL(newLocation, newParameters));
		},
		[getNewURL, locationPath, domain]
	);

	const [routesUnitSubpageID, setRoutesUnitSubpageID] = useState(false);
	const [routesIsOnOverviewSection, setRoutesIsOnOverviewSection] = useState(false);

	return (
		<RoutesContext.Provider
			value={{
				domain,
				location,
				locationPath,
				locationParams,
				changeLocation,
				changeLocationParameters,
				changeLocationAndParameters,
				routesUnitSubpageID,
				setRoutesUnitSubpageID,
				routesIsOnOverviewSection,
				setRoutesIsOnOverviewSection,
			}}
		>
			{children}
		</RoutesContext.Provider>
	);
};

export default RoutesProvider;
