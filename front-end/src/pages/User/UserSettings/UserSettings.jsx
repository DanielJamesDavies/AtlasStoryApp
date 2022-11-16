// Packages

// Components
import { UserSettingsUsername } from "./UserSettingsUsername/UserSettingsUsername";
import { UserSettingsPassword } from "./UserSettingsPassword/UserSettingsPassword";
import { UserSettingsEmail } from "./UserSettingsEmail/UserSettingsEmail";
import { UserSettingsTheme } from "./UserSettingsTheme/UserSettingsTheme";
import { UserSettingsConnectToSpotify } from "./UserSettingsConnectToSpotify/UserSettingsConnectToSpotify";
import { UserSettingsCookiesConsent } from "./UserSettingsCookiesConsent/UserSettingsCookiesConsent";
import { UserSettingsDelete } from "./UserSettingsDelete/UserSettingsDelete";
import { PopUpContainer } from "../../../components/PopUpContainer/PopUpContainer";

// Logic
import { UserSettingsLogic } from "./UserSettingsLogic";

// Context

// Services

// Styles
import "./UserSettings.css";

// Assets

export const UserSettings = () => {
	const { isDisplayingSettings, closeSettings } = UserSettingsLogic();

	return (
		<PopUpContainer className='user-settings-container' title='User Settings' isDisplaying={isDisplayingSettings} onClosePopUp={closeSettings}>
			<div className='user-settings-form'>
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
					<div className='user-settings-section-label'>Theme</div>
					<UserSettingsTheme />
				</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Connect All Devices to Spotfiy</div>
					<UserSettingsConnectToSpotify />
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
		</PopUpContainer>
	);
};
