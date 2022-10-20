// Packages

// Components
import { ToggleInput } from "../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

// Logic
import { UserSettingsConnectToSpotifyLogic } from "./UserSettingsConnectToSpotifyLogic";

// Context

// Services

// Styles
import "./UserSettingsConnectToSpotify.css";

// Assets

export const UserSettingsConnectToSpotify = () => {
	const { errors, connectAllDevicesToSpotify, toggleConnectAllDevicesToSpotify } = UserSettingsConnectToSpotifyLogic();

	return (
		<>
			<ToggleInput
				className='user-settings-connect-to-spotify-input'
				label='Connect All Devices to Spotify'
				value={connectAllDevicesToSpotify}
				onToggle={toggleConnectAllDevicesToSpotify}
				enableEdit={true}
			/>
			<ErrorMessage errors={errors} />
		</>
	);
};
