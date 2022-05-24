import React, { createContext, useState } from "react";

export const APIContext = createContext();

const APIProvider = ({ children }) => {
	const [authorized, setIsAuthorized] = useState(true);
	const [username, setUsername] = useState(false);
	const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:3001/api" : "https://www.atlas-story.app/api";

	const APIRequest = async (path, method, body) => {
		let data = {
			method,
			crossDomain: true,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				withCredentials: true,
			},
		};
		if (body) data.body = JSON.stringify(body);

		const response = await fetch(API_URL + path, data);

		const responseData = await response.json();

		setIsAuthorized(!responseData?.unauthorized);

		return responseData;
	};

	return <APIContext.Provider value={{ authorized, APIRequest, username, setUsername }}>{children}</APIContext.Provider>;
};

export default APIProvider;
