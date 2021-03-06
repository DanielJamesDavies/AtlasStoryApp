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
	const [showPopUp, setShowPopUp] = useState(true);

	const { APIRequest, cookiesConsent } = useContext(APIContext);

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
