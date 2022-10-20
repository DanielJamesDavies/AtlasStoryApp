import React, { createContext, useContext, useState, useEffect } from "react";
import querystring from "query-string";

import { APIContext } from "./APIContext";
import { RoutesContext } from "./RoutesContext";

export const SpotifyContext = createContext();

const SpofityProvider = ({ children }) => {
	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const redirect_uri = process.env.NODE_ENV === "development" ? "http://localhost:3000/spotify" : "https://www.atlas-story.app/spotify";
	const scope = "user-read-private user-read-playback-state user-modify-playback-state playlist-read-private";
	const [spotify_access_token, setSpotifyAccessToken] = useState(false);
	const [spotify_refresh_token, setSpotifyRefreshToken] = useState(false);
	const [connectAllDevicesToSpotify, setConnectAllDevicesToSpotify] = useState(false);

	useEffect(() => {
		async function authorizeSpotify() {
			if (!connectAllDevicesToSpotify) return false;
			if (spotify_access_token || spotify_refresh_token) return true;

			const client_id_response = await APIRequest("/spotify/client-id", "GET");
			const client_id = client_id_response?.data?.client_id;
			if (client_id_response?.errors || !client_id) return false;

			if (window.location.pathname !== "/spotify") {
				window.location.href =
					"https://accounts.spotify.com/authorize?" +
					querystring.stringify({
						response_type: "code",
						client_id,
						scope,
						redirect_uri,
						state: window.location.pathname + window.location.search,
					});
			} else {
				let code = false;
				let previous_location = "/";
				window.location.search
					.substring(1)
					.split("&")
					.forEach((pair) => {
						const pairSplit = pair.split("=");
						if (pairSplit[0] === "code") {
							pairSplit.splice(0, 1);
							code = pairSplit.join("=");
						} else if (pairSplit[0] === "state") {
							pairSplit.splice(0, 1);
							previous_location = pairSplit.join("=").split("%2F").join("/");
						}
						return false;
					});
				if (!code) return false;

				const token_response = await APIRequest("/spotify/get-tokens?code=" + code + "&redirect_uri=" + redirect_uri, "GET");
				if (token_response?.errors || !token_response?.data?.access_token) {
					changeLocation(previous_location);
					return false;
				}
				setSpotifyAccessToken(token_response?.data?.access_token);
				setSpotifyRefreshToken(token_response?.data?.refresh_token);

				changeLocation(previous_location);
			}
		}

		authorizeSpotify();
	}, [
		APIRequest,
		changeLocation,
		redirect_uri,
		scope,
		spotify_access_token,
		setSpotifyAccessToken,
		spotify_refresh_token,
		setSpotifyRefreshToken,
		connectAllDevicesToSpotify,
	]);

	const SpotifyRequest = async (path, method, body, access_token) => {
		if (!spotify_access_token) return false;

		let data = { method, headers: { Authorization: "Bearer " + spotify_access_token } };
		if (body) data.body = JSON.stringify(body);

		try {
			const response = await fetch("https://api.spotify.com/v1" + path, data);

			switch (response.status) {
				case 200:
					return await response.json();
				case 401:
					if (access_token) return false;
					const access_token_response = await APIRequest("/spotify/get-access-token?refresh_token=" + spotify_refresh_token, "GET");
					if (access_token_response?.errors || !access_token_response?.data?.access_token) return false;
					setSpotifyAccessToken(access_token_response?.data?.access_token);
					return await SpotifyRequest(path, method, body, access_token_response?.data?.access_token);
				default:
					return false;
			}
		} catch (error) {
			return false;
		}
	};

	return (
		<SpotifyContext.Provider value={{ SpotifyRequest, connectAllDevicesToSpotify, setConnectAllDevicesToSpotify }}>
			{children}
		</SpotifyContext.Provider>
	);
};

export default SpofityProvider;
