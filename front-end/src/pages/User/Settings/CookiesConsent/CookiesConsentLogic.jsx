// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../../UserContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const CookiesConsentLogic = () => {
	const { setIsAuthorizedToEdit, setIsDisplayingSettings } = useContext(UserContext);
	const { APIRequest, cookiesConsent, setCookiesConsent, setUsername } = useContext(APIContext);

	const [errors, setErrors] = useState([]);

	async function changeCookiesConsentToFalse() {
		setErrors([]);
		const response = await APIRequest("/cookies-consent/", "POST", { cookiesConsent: false });
		if (response.cookiesConsent === undefined) return false;
		if (response?.errors) return setErrors(response.errors);
		setCookiesConsent(false);
		setUsername(false);
		setIsDisplayingSettings(false);
		setIsAuthorizedToEdit(false);
	}

	return { errors, cookiesConsent, changeCookiesConsentToFalse };
};
