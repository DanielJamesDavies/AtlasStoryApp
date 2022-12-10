// Packages

// Components
import { ToggleInput } from "../../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { CookiesConsentLogic } from "./CookiesConsentLogic";

// Context

// Services

// Styles
import "./CookiesConsent.css";

// Assets

export const CookiesConsent = () => {
	const { errors, cookiesConsent, changeCookiesConsentToFalse } = CookiesConsentLogic();

	return (
		<>
			<ToggleInput
				className='user-settings-cookies-consent-input'
				label='Allow Cookies'
				value={cookiesConsent}
				onToggle={changeCookiesConsentToFalse}
				enableEdit={true}
			/>
			<ErrorMessage errors={errors} attribute='cookiesConsent' />
			<ErrorMessage errors={errors} />
		</>
	);
};
