// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../../../context/APIContext";
import { SpotifyContext } from "../../../../context/SpotifyContext";

// Services

// Styles

// Assets

export const ConnectToSpotifyLogic = () => {
	const { APIRequest } = useContext(APIContext);
	const { connectDeviceToSpotify, setConnectDeviceToSpotify } = useContext(SpotifyContext);

	const [errors, setErrors] = useState([]);

	async function toggleConnectDeviceToSpotify() {
		setErrors([]);

		const newConnectDeviceToSpotify = connectDeviceToSpotify ? false : true;

		const response = await APIRequest("/spotify/should-connect-device", "PATCH", { shouldConnectDevice: newConnectDeviceToSpotify });
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		setConnectDeviceToSpotify(response?.shouldConnectDevice);
		return true;
	}

	return { errors, connectDeviceToSpotify, toggleConnectDeviceToSpotify };
};
