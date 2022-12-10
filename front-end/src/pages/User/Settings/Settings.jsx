// Packages

// Components
import { Username } from "./Username/Username";
import { Password } from "./Password/Password";
import { Email } from "./Email/Email";
import { Theme } from "./Theme/Theme";
import { FontSize } from "./FontSize/FontSize";
import { ConnectToSpotify } from "./ConnectToSpotify/ConnectToSpotify";
import { CookiesConsent } from "./CookiesConsent/CookiesConsent";
import { Delete } from "./Delete/Delete";
import { PopUpContainer } from "../../../components/PopUpContainer/PopUpContainer";

// Logic
import { SettingsLogic } from "./SettingsLogic";

// Context

// Services

// Styles
import "./Settings.css";

// Assets

export const Settings = () => {
	const { isDisplayingSettings, closeSettings } = SettingsLogic();

	return (
		<PopUpContainer
			className='user-settings-container'
			title='User Settings'
			isDisplaying={isDisplayingSettings}
			onClosePopUp={closeSettings}
			nullOnHidden={true}
		>
			<div className='user-settings-form'>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Username</div>
					<Username />
				</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Password</div>
					<Password />
				</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Email</div>
					<Email />
				</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Theme</div>
					<Theme />
				</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Font Size</div>
					<FontSize />
				</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Connect This Device to Spotfiy</div>
					<ConnectToSpotify />
				</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Cookies Consent</div>
					<CookiesConsent />
				</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Delete Account</div>
					<Delete />
				</div>
			</div>
		</PopUpContainer>
	);
};
