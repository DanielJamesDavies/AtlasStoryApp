// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../../UserContext";
import { APIContext } from "../../../../context/APIContext";
import { SpotifyContext } from "../../../../context/SpotifyContext";

// Services

// Styles

// Assets

export const UserSettingsConnectToSpotifyLogic = () => {
	const { user } = useContext(UserContext);
	const { APIRequest } = useContext(APIContext);
	const { connectAllDevicesToSpotify, setConnectAllDevicesToSpotify } = useContext(SpotifyContext);

	const [errors, setErrors] = useState([]);

	async function toggleConnectAllDevicesToSpotify() {
		setErrors([]);

		const newConnectAllDevicesToSpotify = user?.data?.connectToSpotify ? false : true;

		const response = await APIRequest("/user/", "PATCH", { path: ["data", "connectToSpotify"], newValue: newConnectAllDevicesToSpotify });
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		setConnectAllDevicesToSpotify(newConnectAllDevicesToSpotify);
		return true;
	}

	return { errors, connectAllDevicesToSpotify, toggleConnectAllDevicesToSpotify };
};
