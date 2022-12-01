// Packages

// Components
import { ToggleInput } from "../../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { UserSettingsConnectToSpotifyLogic } from "./UserSettingsConnectToSpotifyLogic";

// Context

// Services

// Styles
import "./UserSettingsConnectToSpotify.css";

// Assets

export const UserSettingsConnectToSpotify = () => {
	const { errors, connectDeviceToSpotify, toggleConnectDeviceToSpotify } = UserSettingsConnectToSpotifyLogic();

	return (
		<>
			<ToggleInput
				className='user-settings-connect-to-spotify-input'
				label='Connect This Device to Spotify'
				value={connectDeviceToSpotify}
				onToggle={toggleConnectDeviceToSpotify}
				enableEdit={true}
			/>
			<ErrorMessage errors={errors} />
		</>
	);
};
