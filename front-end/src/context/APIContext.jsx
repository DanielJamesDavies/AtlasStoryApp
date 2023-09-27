import React, { createContext, useState, useCallback } from "react";

export const APIContext = createContext();

const APIProvider = ({ children }) => {
	const [user_id, setUserID] = useState(false);
	const [username, setUsername] = useState(false);
	const [userProfilePicture, setUserProfilePicture] = useState(false);
	const [userBanner, setUserBanner] = useState(false);
	const [cookiesConsent, setCookiesConsent] = useState(false);
	const [showCookiesConsentPopUp, setShowCookiesConsentPopUp] = useState(false);

	const APIRequest = useCallback(
		async (path, method, body) => {
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

			try {
				const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:3001/api" : "https://www.atlas-story.app/api";

				const response = await fetch(API_URL + path, data);

				const responseData = await response.json();

				if (responseData?.cookiesConsent !== undefined) {
					setCookiesConsent(responseData?.cookiesConsent);
					if(responseData?.cookiesConsent === false) setShowCookiesConsentPopUp(true);
				}

				return responseData;
			} catch (e) {
				return { errors: [{ message: "Failed to Send Request to Server" }] };
			}
		},
		[setCookiesConsent, setShowCookiesConsentPopUp]
	);

	return (
		<APIContext.Provider
			value={{
				APIRequest,
				user_id,
				setUserID,
				username,
				setUsername,
				userProfilePicture,
				setUserProfilePicture,
				userBanner,
				setUserBanner,
				cookiesConsent,
				setCookiesConsent,
				showCookiesConsentPopUp,
				setShowCookiesConsentPopUp,
			}}
		>
			{children}
		</APIContext.Provider>
	);
};

export default APIProvider;
