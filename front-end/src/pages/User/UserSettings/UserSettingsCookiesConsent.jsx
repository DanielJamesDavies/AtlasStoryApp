// Packages

// Components
import { ToggleInput } from "../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

// Logic
import { UserSettingsCookiesConsentLogic } from "./UserSettingsCookiesConsentLogic";

// Context

// Services

// Styles
import "./UserSettingsCookiesConsent.css";

// Assets

export const UserSettingsCookiesConsent = () => {
	const { errors, cookiesConsent, changeCookiesConsentToFalse } = UserSettingsCookiesConsentLogic();

	return (
		<>
			<ToggleInput
				className='user-settings-cookies-consent-input'
				label='Allow Cookies'
				value={cookiesConsent}
				onToggle={changeCookiesConsentToFalse}
			/>
			<ErrorMessage errors={errors} attribute='cookiesConsent' />
			<ErrorMessage errors={errors} />
		</>
	);
};
