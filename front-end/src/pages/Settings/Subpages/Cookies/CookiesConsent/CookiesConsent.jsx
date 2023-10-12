// Packages

// Components
import { ContentItem } from "../../../../../components/ContentItem/ContentItem";
import { ToggleInput } from "../../../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";

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
		<ContentItem className='settings-item' size='s' hasBg={true}>
			<div className='settings-item-title'>Cookies Consent</div>
			<div className='setttings-item-cookies-consent-description'>
				This web app uses cookies that are necessary for its basic functioning. We require your consent to set cookies on your device.
			</div>
			<ToggleInput
				className='user-settings-cookies-consent-input'
				label='Allow Cookies'
				value={cookiesConsent}
				onToggle={changeCookiesConsentToFalse}
				enableEdit={true}
			/>
			<ErrorMessage errors={errors} attribute='cookiesConsent' />
			<ErrorMessage errors={errors} />
		</ContentItem>
	);
};
