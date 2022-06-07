// Packages

// Components
import { UserSettingsUsername } from "./UserSettingsUsername";
import { UserSettingsPassword } from "./UserSettingsPassword";
import { UserSettingsEmail } from "./UserSettingsEmail";
import { UserSettingsCookiesConsent } from "./UserSettingsCookiesConsent";
import { UserSettingsDelete } from "./UserSettingsDelete";

// Logic
import { UserSettingsLogic } from "./UserSettingsLogic";

// Context

// Services

// Styles
import "./UserSettings.css";

// Assets

export const UserSettings = () => {
	const { isDisplayingSettings, closeSettings } = UserSettingsLogic();

	if (!isDisplayingSettings) return null;
	return (
		<div className='user-settings-container'>
			<div className='user-settings'>
				<div className='user-settings-title'>User Settings</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Username</div>
					<UserSettingsUsername />
				</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Password</div>
					<UserSettingsPassword />
				</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Email</div>
					<UserSettingsEmail />
				</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Cookies Consent</div>
					<UserSettingsCookiesConsent />
				</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Delete Account</div>
					<UserSettingsDelete />
				</div>
			</div>
			<div className='user-settings-background' onClick={closeSettings} />
		</div>
	);
};
