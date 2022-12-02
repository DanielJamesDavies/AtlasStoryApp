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
	const [showPopUp, setShowPopUp] = useState(false);

	const { APIRequest, cookiesConsent, setCookiesConsent } = useContext(APIContext);

	useEffect(() => {
		async function getCookiesConsent() {
			const response = await APIRequest("/cookies-consent", "GET");
			if (!response || response?.errors || response?.data?.cookiesConsent === undefined) return false;
			setCookiesConsent(response?.data?.cookiesConsent);
		}
		getCookiesConsent();
	}, [setCookiesConsent, APIRequest]);

	useEffect(() => {
		setShowPopUp(!cookiesConsent);
	}, [cookiesConsent]);

	async function acceptCookies() {
		setShowPopUp(false);
		await APIRequest("/cookies-consent/", "POST", { cookiesConsent: true });
	}

	async function rejectCookies() {
		setShowPopUp(false);
		await APIRequest("/cookies-consent/", "POST", { cookiesConsent: false });
	}

	const [isShowingWhatFor, setIsShowingWhatFor] = useState(false);

	function showWhatFor() {
		setIsShowingWhatFor(true);
	}

	function hideWhatFor() {
		setIsShowingWhatFor(false);
	}

	return { showPopUp, acceptCookies, rejectCookies, isShowingWhatFor, showWhatFor, hideWhatFor };
};
