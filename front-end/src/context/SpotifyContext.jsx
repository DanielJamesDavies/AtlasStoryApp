import React, { createContext, useContext, useState, useEffect, useRef } from "react";

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
	const [connectDeviceToSpotify, setConnectDeviceToSpotify] = useState(false);
	const hasAttemptedAuthorization = useRef(false);
	const attempts = useRef(0);

	useEffect(() => {
		async function authorizeSpotify() {
			if (attempts.current !== 0) await new Promise((resolve) => setTimeout(resolve, 1500));
			if (spotify_access_token || spotify_refresh_token) return true;

			const max_attempts = 2;
			if (attempts.current >= max_attempts) return false;

			if (window === window?.parent) {
				const should_connect_device_response = await APIRequest("/spotify/should-connect-device", "GET");
				const shouldConnectDevice = should_connect_device_response?.shouldConnectDevice;
				setConnectDeviceToSpotify(shouldConnectDevice);
				if (!shouldConnectDevice) return false;
			}

			if (window.location.pathname !== "/spotify") {
				const client_id_response = await APIRequest("/spotify/client-id", "GET");
				const client_id = client_id_response?.data?.client_id;
				if (client_id_response?.errors || !client_id) return false;

				const spotifyAuthURL =
					"https://accounts.spotify.com/authorize?response_type=code&client_id=" +
					client_id +
					"&scope=" +
					scope +
					"&redirect_uri=" +
					redirect_uri +
					"&state=" +
					"url<" +
					window.location.pathname +
					window.location.search +
					">,attempts<" +
					(attempts.current + 1) +
					">";

				if (/Mobi/i.test(window.navigator.userAgent)) {
					if (spotify_access_token || spotify_refresh_token) return true;
					if (attempts.current < max_attempts) window.location = spotifyAuthURL;
				} else {
					if (window === window?.parent) return false;

					if (window.location.pathname === "/authorize-spotify") {
						window.parent.postMessage(JSON.stringify({ message: "spotify-authorizing" }), "*");
						if (spotify_access_token || spotify_refresh_token) return true;
						window.location = spotifyAuthURL;
					}
				}
				return true;
			} else {
				hasAttemptedAuthorization.current = true;

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
							const state = pairSplit
								.join("=")
								.split("%2C")
								.map((value) => {
									let newValue = value.split("%2F").join("/").split("%3E").join("").split("%3C");
									const key = newValue.splice(0, 1)[0];
									return { key, value: newValue.join("<") };
								});
							previous_location = state.find((e) => e.key === "url")?.value;
							attempts.current = parseInt(state.find((e) => e.key === "attempts")?.value);
						}
						return false;
					});
				if (!code) return false;

				if (window !== window?.parent) window.parent.postMessage(JSON.stringify({ message: "spotify-code", code }), "*");

				const token_response = await APIRequest("/spotify/get-tokens?code=" + code + "&redirect_uri=" + redirect_uri, "GET");
				if (token_response?.data?.access_token) setSpotifyAccessToken(token_response.data.access_token);
				if (token_response?.data?.refresh_token) setSpotifyRefreshToken(token_response.data.refresh_token);

				if (window !== window?.parent)
					window.parent.postMessage(
						JSON.stringify({
							message: "spotify-tokens",
							code: code,
							access_token: token_response?.data?.access_token,
							refresh_token: token_response.data.refresh_token,
						}),
						"*"
					);

				setTimeout(() => changeLocation(previous_location), 50);
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
		connectDeviceToSpotify,
		setConnectDeviceToSpotify,
		hasAttemptedAuthorization,
		attempts,
	]);

	const spotifyAuthorizationTimeout = useRef(null);

	useEffect(() => {
		async function windowMessageEventHandler(e) {
			if (spotify_access_token || spotify_refresh_token) return false;
			if (
				!e?.isTrusted ||
				!((e.origin === process.env.NODE_ENV) === "development" ? "http://localhost:3000/" : "https://www.atlas-story.app/")
			)
				return false;

			let data = false;
			try {
				data = JSON.parse(e?.data);
			} catch (e) {}
			if (!data) return false;

			switch (data.message) {
				case "spotify-authorizing":
					const client_id_response = await APIRequest("/spotify/client-id", "GET");
					const client_id = client_id_response?.data?.client_id;
					if (client_id_response?.errors || !client_id) return false;

					if (spotifyAuthorizationTimeout.current === null && !hasAttemptedAuthorization.current)
						spotifyAuthorizationTimeout.current = setTimeout(() => {
							let currSpotifyAccessToken = false;
							setSpotifyAccessToken((currValue) => {
								currSpotifyAccessToken = currValue;
								return currValue;
							});
							if (currSpotifyAccessToken) return true;

							const spotifyAuthURL =
								"https://accounts.spotify.com/authorize?response_type=code&client_id=" +
								client_id +
								"&scope=" +
								scope +
								"&redirect_uri=" +
								redirect_uri +
								"&state=" +
								"url<" +
								window.location.pathname +
								window.location.search +
								">,attempts<" +
								(attempts.current + 1) +
								">";

							if (spotify_access_token || spotify_refresh_token) return true;
							window.location = spotifyAuthURL;
						}, 5000);
					return;
				case "spotify-code":
					if (spotifyAuthorizationTimeout !== null) clearTimeout(spotifyAuthorizationTimeout.current);
					spotifyAuthorizationTimeout.current = null;

					const token_response = await APIRequest("/spotify/get-tokens?code=" + data?.code + "&redirect_uri=" + redirect_uri, "GET");
					if (token_response?.data?.access_token) setSpotifyAccessToken(token_response.data.access_token);
					if (token_response?.data?.refresh_token) setSpotifyRefreshToken(token_response.data.refresh_token);
					return;
				case "spotify-tokens":
					if (spotifyAuthorizationTimeout !== null) clearTimeout(spotifyAuthorizationTimeout.current);
					spotifyAuthorizationTimeout.current = null;

					if (data?.access_token) setSpotifyAccessToken(data.access_token);
					if (data?.refresh_token) setSpotifyRefreshToken(data.refresh_token);

					return;
				default:
					break;
			}
		}
		window.addEventListener("message", windowMessageEventHandler);
		return () => {
			window.removeEventListener("message", windowMessageEventHandler);
			clearInterval(spotifyAuthorizationTimeout.current);
		};
	}, [spotify_access_token, spotify_refresh_token, APIRequest, spotifyAuthorizationTimeout, hasAttemptedAuthorization, redirect_uri]);

	const SpotifyRequest = async (path, method, body, access_token) => {
		if (window !== window.parent) return false;
		if (!spotify_access_token || !connectDeviceToSpotify) return false;

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
		<SpotifyContext.Provider
			value={{
				SpotifyRequest,
				spotify_access_token,
				spotify_refresh_token,
				connectDeviceToSpotify,
				setConnectDeviceToSpotify,
			}}
		>
			{children}
		</SpotifyContext.Provider>
	);
};

export default SpofityProvider;
