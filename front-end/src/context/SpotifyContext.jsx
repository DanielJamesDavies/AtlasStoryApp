import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

import { APIContext } from "./APIContext";
import { RoutesContext } from "./RoutesContext";

export const SpotifyContext = createContext();

const SpofityProvider = ({ children }) => {
	const { APIRequest } = useContext(APIContext);
	const { locationParams, changeLocationAndParameters } = useContext(RoutesContext);
	const redirect_uri = process.env.NODE_ENV === "development" ? "http://localhost:3000/spotify" : "https://www.atlas-story.app/spotify";
	const scope =
		"streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state playlist-read-private app-remote-control ";
	const [spotify_access_token, setSpotifyAccessToken] = useState(false);
	const [spotify_refresh_token, setSpotifyRefreshToken] = useState(false);
	const isAuthorized = useRef(false);
	const [connectDeviceToSpotify, setConnectDeviceToSpotify] = useState(false);
	const [device_id, setSpotifyDeviceID] = useState(false);
	const hasAttemptedAuthorization = useRef(false);
	const attempts = useRef(0);

	useEffect(() => {
		async function authorizeSpotify() {
			if (attempts.current !== 0) await new Promise((resolve) => setTimeout(resolve, 2000));
			if (isAuthorized.current) return true;

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
					if (isAuthorized.current) return true;
					if (attempts.current < max_attempts) window.location = spotifyAuthURL;
				} else {
					if (window === window?.parent) return false;

					if (window.location.pathname === "/authorize-spotify") {
						window.parent.postMessage(JSON.stringify({ message: "spotify-authorizing" }), "*");
						if (isAuthorized.current) return true;
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
				if (token_response?.data?.access_token && token_response?.data?.refresh_token) isAuthorized.current = true;

				if (window !== window?.parent && token_response?.data?.access_token && token_response?.data?.refresh_token) {
					window.parent.postMessage(
						JSON.stringify({
							message: "spotify-tokens",
							code: code,
							access_token: token_response?.data?.access_token,
							refresh_token: token_response?.data?.refresh_token,
						}),
						"*"
					);
				}

				const new_parameters = locationParams.current.filter((e) => !["code", "state"].includes(e.label));
				setTimeout(() => changeLocationAndParameters(decodeURIComponent(previous_location), new_parameters), 50);
			}
		}

		authorizeSpotify();
	}, [
		APIRequest,
		redirect_uri,
		scope,
		isAuthorized,
		setSpotifyAccessToken,
		setSpotifyRefreshToken,
		connectDeviceToSpotify,
		setConnectDeviceToSpotify,
		hasAttemptedAuthorization,
		attempts,
		locationParams,
		changeLocationAndParameters,
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

	const isCreatingPlayer = useRef(false);
	const player = useRef(false);
	const isSpotifyPlaying = useRef(false);

	useEffect(() => {
		if (spotify_access_token && window.Spotify && isCreatingPlayer?.current === false) {
			isCreatingPlayer.current = true;
			player.current = new window.Spotify.Player({
				name: "Atlas Story App",
				getOAuthToken: (callback) => {
					callback(spotify_access_token);
				},
				volume: 0.5,
			});

			player.current.addListener("ready", ({ device_id }) => {
				setSpotifyDeviceID(device_id);
			});

			player.current.connect();

			const handleBeforeUnload = () => player.current.disconnect();

			window.addEventListener("beforeunload", handleBeforeUnload);

			return () => {
				window.removeEventListener("beforeunload", handleBeforeUnload);
			};
		}
	}, [spotify_access_token]);

	const getSpotifyPlaybackState = useCallback(
		async () => {
			const playback_state = await SpotifyRequest(`/me/player`, "GET");
			return playback_state;
		}, // eslint-disable-next-line
		[SpotifyRequest, spotify_access_token]
	);

	const [spotify_playback_state, setSpotifyPlaybackState] = useState(false);
	const last_play_request = useRef(false);
	const playSpotifyTrack = useCallback(
		async (uri, options) => {
			// Find Computer Device
			const devices = await SpotifyRequest(`/me/player/devices`, "GET");
			const other_computer_devices = devices?.devices
				.filter((e) => e?.type?.toLowerCase() === "computer" && e?.name !== "Atlas Story App")
				?.map((e) => e?.id);
			let new_device_id = JSON.parse(JSON.stringify(device_id));
			if (other_computer_devices.length !== 0) new_device_id = other_computer_devices[0];
			if (new_device_id === false) return false;

			let { position_ms, pause, position, local_uri } = options;

			if (
				last_play_request?.current !== false &&
				JSON.stringify({
					uri: last_play_request?.current?.uri,
					pause: last_play_request?.current?.pause,
					position: last_play_request?.current?.position,
					local_uri: last_play_request?.current?.local_uri,
				}) === JSON.stringify({ uri, pause, position, local_uri }) &&
				Math.abs(last_play_request?.current?.position_ms - position_ms) < 200
			) {
				return false;
			}
			last_play_request.current = { uri, pause, position, local_uri, position_ms };

			try {
				// Pause Player
				if (pause) {
					SpotifyRequest(`/me/player/pause?device_id=${new_device_id}`, "PUT");
					isSpotifyPlaying.current = false;
					return false;
				}

				// Get Local Track Position
				if (local_uri !== undefined) {
					const playlist_res = await SpotifyRequest("/playlists/" + encodeURI(uri.replace("spotify:playlist:", "")) + "/tracks");
					position = playlist_res?.items?.findIndex((e) => e?.track?.uri === local_uri);
				}

				// Create Body
				let body = {};

				if (uri.split(":")[1] === "track") body.uris = [uri];
				if (uri.split(":")[1] === "playlist") body.context_uri = uri;

				if (position !== undefined) body.offset = { position };
				if (position_ms !== undefined) body.position_ms = position_ms;

				// Play Track
				SpotifyRequest(`/me/player/play?device_id=${new_device_id}`, "PUT", body);
				isSpotifyPlaying.current = true;

				setTimeout(async () => {
					const playback_state = await getSpotifyPlaybackState();
					setSpotifyPlaybackState(playback_state);
				}, 500);
			} catch {}
		}, // eslint-disable-next-line
		[device_id, SpotifyRequest, spotify_access_token, getSpotifyPlaybackState]
	);

	const changeSpotifyPlayerVolume = useCallback(
		async (volume) => {
			if (device_id === false) return false;

			player.current.setVolume(volume);
		},
		[device_id, player]
	);

	return (
		<SpotifyContext.Provider
			value={{
				SpotifyRequest,
				spotify_access_token,
				spotify_refresh_token,
				connectDeviceToSpotify,
				setConnectDeviceToSpotify,
				isSpotifyPlaying,
				getSpotifyPlaybackState,
				spotify_playback_state,
				playSpotifyTrack,
				changeSpotifyPlayerVolume,
			}}
		>
			{children}
		</SpotifyContext.Provider>
	);
};

export default SpofityProvider;
