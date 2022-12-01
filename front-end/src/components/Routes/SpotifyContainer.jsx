// Packages

// Components
import { Routes } from "./Routes";

// Logic
import { SpotifyContainerLogic } from "./SpotifyContainerLogic";

// Context

// Services

// Styles
import "./SpotifyContainer.css";

// Assets

export const SpotifyContainer = () => {
	const { spotify_access_token, spotify_refresh_token, connectDeviceToSpotify } = SpotifyContainerLogic();

	return (
		<>
			<Routes />
			{/Mobi/i.test(window.navigator.userAgent) ||
			(spotify_access_token && spotify_refresh_token) ||
			window !== window?.parent ||
			!connectDeviceToSpotify ? null : (
				<iframe className='spotify-container-iframe' title='Spotify' src={"/authorize-spotify"} />
			)}
		</>
	);
};
