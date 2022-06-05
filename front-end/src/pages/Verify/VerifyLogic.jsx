// Packages
import { useState, useContext, useEffect } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

// Services

// Styles

// Assets

export const VerifyLogic = ({ username, email, verificationCode }) => {
	const { APIRequest, setUsername } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [hasVerified, setHasVerified] = useState(false);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		async function verifyUser() {
			setUsername(false);
			setErrors([]);
			const response = await APIRequest("/user/verify", "POST", { username, email, verificationCode });
			if (response?.errors) return setErrors(response.errors);

			setHasVerified(true);
			setTimeout(() => {
				changeLocation("/login");
			}, 1000);
		}
		verifyUser();
	}, [APIRequest, setErrors, setHasVerified, changeLocation, username, setUsername, email, verificationCode]);

	return { hasVerified, errors };
};
