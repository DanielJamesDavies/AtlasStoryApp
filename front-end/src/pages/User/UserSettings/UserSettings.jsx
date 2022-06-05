// Packages

// Components
import { UserSettingsUsername } from "./UserSettingsUsername";
import { ToggleInput } from "../../../components/ToggleInput/ToggleInput";

// Logic
import { UserSettingsLogic } from "./UserSettingsLogic";

// Context

// Services

// Styles
import "./UserSettings.css";

// Assets

export const UserSettings = () => {
	const { isDisplayingSettings, closeSettings, cookiesConsent, changeCookiesConsentToFalse } = UserSettingsLogic();

	if (!isDisplayingSettings) return null;
	return (
		<div className='user-settings-container'>
			<div className='user-settings'>
				<div className='user-settings-title'>Settings</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Username</div>
					<UserSettingsUsername />
				</div>
				{/* <div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Password</div>
				</div> */}
				{/* <div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Email</div>
				</div> */}
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Cookies Consent</div>
					<ToggleInput
						className='user-settings-cookies-consent-input'
						label='Allow Cookies'
						value={cookiesConsent}
						onToggle={changeCookiesConsentToFalse}
					/>
				</div>
				{/* <div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Delete Account</div>
				</div> */}
			</div>
			<div className='user-settings-background' onClick={closeSettings} />
		</div>
	);
};
