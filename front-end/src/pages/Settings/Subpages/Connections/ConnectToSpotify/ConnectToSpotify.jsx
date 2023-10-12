// Packages

// Components
import { ContentItem } from "../../../../../components/ContentItem/ContentItem";
import { ToggleInput } from "../../../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { ConnectToSpotifyLogic } from "./ConnectToSpotifyLogic";

// Context

// Services

// Styles
import "./ConnectToSpotify.css";

// Assets

export const ConnectToSpotify = () => {
	const { errors, connectDeviceToSpotify, toggleConnectDeviceToSpotify } = ConnectToSpotifyLogic();

	return (
		<ContentItem className='settings-item' size='s' hasBg={true}>
			<div className='settings-item-title'>Spotify Connection</div>
			<ToggleInput
				className='user-settings-connect-to-spotify-input'
				label='Connect This Device to Spotify'
				value={connectDeviceToSpotify}
				onToggle={toggleConnectDeviceToSpotify}
				enableEdit={true}
			/>
			<ErrorMessage errors={errors} />
		</ContentItem>
	);
};
