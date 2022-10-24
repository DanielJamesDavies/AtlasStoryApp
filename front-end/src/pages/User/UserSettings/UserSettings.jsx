// Packages

// Components
import { PopUpContainer } from "../../../components/PopUpContainer/PopUpContainer";
import { UserSettingsUsername } from "./UserSettingsUsername";
import { UserSettingsPassword } from "./UserSettingsPassword";
import { UserSettingsEmail } from "./UserSettingsEmail";
import { UserSettingsTheme } from "./UserSettingsTheme";
import { UserSettingsConnectToSpotify } from "./UserSettingsConnectToSpotify";
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
