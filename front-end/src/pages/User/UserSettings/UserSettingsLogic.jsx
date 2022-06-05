// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const UserSettingsLogic = () => {
	const { setIsAuthorizedToEdit, isDisplayingSettings, setIsDisplayingSettings } = useContext(UserContext);
	const { APIRequest, cookiesConsent, setCookiesConsent, setUsername } = useContext(APIContext);

	function closeSettings() {
		setIsDisplayingSettings(false);
	}

	async function changeCookiesConsentToFalse() {
		const response = await APIRequest("/cookies-consent/", "POST", { cookiesConsent: false });
		if (response.cookiesConsent === undefined) return false;
		setCookiesConsent(false);
		setUsername(false);
		setIsDisplayingSettings(false);
		setIsAuthorizedToEdit(false);
	}

	return { isDisplayingSettings, closeSettings, cookiesConsent, changeCookiesConsentToFalse };
};
