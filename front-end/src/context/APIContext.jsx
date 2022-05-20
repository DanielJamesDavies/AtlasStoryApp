import React, { createContext, useState } from "react";

export const APIContext = createContext();

const APIProvider = ({ children }) => {
	const [token, setToken] = useState(false);

	const APIRequest = async (path, method, data) => {
		const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://atlas-story-app.herokuapp.com";

		let headers = {
			Accept: "application/json",
			"Content-Type": "application/json",
		};
		if (token) headers.token = token;

		const response = await fetch(API_URL + path, {
			method,
			headers,
			body: JSON.stringify(data),
		});

		const responseData = await response.json();
		return responseData;
	};

	return <APIContext.Provider value={{ token, setToken, APIRequest }}>{children}</APIContext.Provider>;
};

export default APIProvider;
