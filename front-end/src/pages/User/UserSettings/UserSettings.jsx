// Packages

// Components
import { UserSettingsUsername } from "./UserSettingsUsername";
import { UserSettingsPassword } from "./UserSettingsPassword";
import { UserSettingsEmail } from "./UserSettingsEmail";
import { ToggleInput } from "../../../components/ToggleInput/ToggleInput";
import { ConfirmDelete } from "../../../components/ConfirmDelete/ConfirmDelete";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

// Logic
import { UserSettingsLogic } from "./UserSettingsLogic";

// Context

// Services

// Styles
import "./UserSettings.css";

// Assets

export const UserSettings = () => {
	const { isAuthorizedToEdit, isDisplayingSettings, errors, closeSettings, cookiesConsent, changeCookiesConsentToFalse, deleteUser } =
		UserSettingsLogic();

	if (!isDisplayingSettings) return null;
	return (
		<div className='user-settings-container'>
			<div className='user-settings'>
				<div className='user-settings-title'>Settings</div>
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
					<ToggleInput
						className='user-settings-cookies-consent-input'
						label='Allow Cookies'
						value={cookiesConsent}
						onToggle={changeCookiesConsentToFalse}
					/>
					<ErrorMessage errors={errors} attribute='cookiesConsent' />
				</div>
				<div className='user-settings-section-container'>
					<div className='user-settings-section-label'>Delete Account</div>
					<ConfirmDelete
						state={isDisplayingSettings}
						className='user-settings-confirm-delete'
						seamless={true}
						labelContext='your account'
						onDelete={deleteUser}
						isAuthorizedToEdit={isAuthorizedToEdit}
					/>
					<ErrorMessage errors={errors} attribute='deleteUser' />
				</div>
			</div>
			<div className='user-settings-background' onClick={closeSettings} />
		</div>
	);
};
