// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SpotifyContext } from "../../context/SpotifyContext";

// Services

// Styles

// Assets

export const SpotifyContainerLogic = () => {
	const { spotify_access_token, spotify_refresh_token, connectDeviceToSpotify } = useContext(SpotifyContext);

	return { spotify_access_token, spotify_refresh_token, connectDeviceToSpotify };
};
