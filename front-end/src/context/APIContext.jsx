import React, { createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const APIContext = createContext();

const APIProvider = ({ children }) => {
	const [authorized, setIsAuthorized] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();
	const unauthorizedPages = ["/", "/login/", "/register/"];

	const APIRequest = async (path, method, body) => {
		const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://atlas-story-app.herokuapp.com";
		let data = {
			method,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				withCredentials: true,
				credentials: "include",
			},
		};
		if (body) data.body = JSON.stringify(body);

		const response = await fetch(API_URL + path, data);

		const responseData = await response.json();

		if (responseData?.unauthorised) {
			setIsAuthorized(false);
			if (unauthorizedPages.findIndex((e) => e === location.pathname || e === location.pathname + "/") === -1) {
				navigate("/login");
			}
		} else {
			setIsAuthorized(true);
		}

		return responseData;
	};

	return <APIContext.Provider value={{ authorized, APIRequest }}>{children}</APIContext.Provider>;
};

export default APIProvider;
