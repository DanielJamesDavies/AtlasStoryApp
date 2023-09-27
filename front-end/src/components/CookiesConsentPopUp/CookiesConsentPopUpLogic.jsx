// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";

// Services

// Styles

// Assets

export const CookiesConsentPopUpLogic = () => {
	const { APIRequest, cookiesConsent, setCookiesConsent, showCookiesConsentPopUp, setShowCookiesConsentPopUp } = useContext(APIContext);

	useEffect(() => {
		async function getCookiesConsent() {
			const response = await APIRequest("/cookies-consent", "GET");
			if (!response || response?.errors || response?.data?.cookiesConsent === undefined) return false;
			setCookiesConsent(response?.data?.cookiesConsent);
		}
		getCookiesConsent();
	}, [setCookiesConsent, APIRequest]);

	useEffect(() => {
		setShowCookiesConsentPopUp(!cookiesConsent);
	}, [cookiesConsent, setShowCookiesConsentPopUp]);

	async function acceptCookies() {
		setShowCookiesConsentPopUp(false);
		await APIRequest("/cookies-consent/", "POST", { cookiesConsent: true });
	}

	async function rejectCookies() {
		setShowCookiesConsentPopUp(false);
		await APIRequest("/cookies-consent/", "POST", { cookiesConsent: false });
	}

	const [isShowingWhatFor, setIsShowingWhatFor] = useState(false);

	function showWhatFor() {
		setIsShowingWhatFor(true);
	}

	function hideWhatFor() {
		setIsShowingWhatFor(false);
	}

	return { showCookiesConsentPopUp, acceptCookies, rejectCookies, isShowingWhatFor, showWhatFor, hideWhatFor };
};
