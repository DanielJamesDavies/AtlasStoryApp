// Packages
import { useContext, useEffect, useRef, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../UnitPageContext";
import { APIContext } from "../../../../../context/APIContext";
import { SpotifyContext } from "../../../../../context/SpotifyContext";

// Services

// Styles

// Assets

export const SoundtrackLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit, openSubpageID, unitSoundtrack, setUnitSoundtrack, getUnitSoundtrack } =
		useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { spotify_refresh_token } = useContext(SpotifyContext);

	useEffect(() => {
		const pathname = JSON.parse(JSON.stringify(document.location.pathname));
		const interval = setInterval(() => {
			if (pathname !== JSON.parse(JSON.stringify(document.location.pathname))) {
				clearInterval(interval);
				return false;
			}
			getUnitSoundtrack();
		}, 5000);
		return () => clearInterval(interval);
	}, [openSubpageID, getUnitSoundtrack]);

	async function revertSoundtrack() {
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "soundtrack"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.soundtrack = response.data.value;
		setUnit(newUnit);

		if (unitSoundtrack) {
			let newUnitSoundtrack = JSON.parse(JSON.stringify(unitSoundtrack));
			newUnitSoundtrack.tracks = newUnitSoundtrack.tracks.map((track) => {
				let newTrackIndex = response.data.value?.tracks?.findIndex((e) => e.uri === track.uri);
				if (newTrackIndex === -1) return track;
				let newTrack = JSON.parse(JSON.stringify(track));
				newTrack.text = response.data.value?.tracks[newTrackIndex].text;
				return newTrack;
			});
			setUnitSoundtrack(newUnitSoundtrack);
		}

		return true;
	}

	async function saveSoundtrack() {
		let newSoundtrack = JSON.parse(JSON.stringify(unit)).data.soundtrack;
		let newUnitSoundtrack = JSON.parse(JSON.stringify(unitSoundtrack));

		if (!newUnitSoundtrack) newUnitSoundtrack = { playlist_id: newSoundtrack.playlist_id, tracks: [] };
		newUnitSoundtrack.tracks = newUnitSoundtrack?.tracks.map((track) => {
			return {
				id: track?.id,
				uri: track?.uri,
				is_local: track?.is_local,
				name: track?.name,
				artists: track?.artists,
				album: track?.album,
				artwork_url: track?.artwork_url,
				text: track?.text,
				is_removed: false,
			};
		});

		newSoundtrack.tracks = newSoundtrack?.tracks.map((track) => {
			return {
				id: track?.id,
				uri: track?.uri,
				is_local: track?.is_local,
				name: track?.name,
				artists: track?.artists,
				album: track?.album,
				artwork_url: track?.artwork_url,
				text: track?.text,
				is_removed: spotify_refresh_token ? true : false,
			};
		});

		newUnitSoundtrack.tracks = newUnitSoundtrack.tracks.concat(newSoundtrack.tracks);

		for (let i = newUnitSoundtrack.tracks.length - 1; i > 0; i--) {
			if (newUnitSoundtrack.tracks.findIndex((e, index) => index !== i && e.uri === newUnitSoundtrack.tracks[i].uri) !== -1) {
				newUnitSoundtrack.tracks.splice(i, 1);
			}
		}

		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "soundtrack"],
			newValue: newUnitSoundtrack,
		});
		if (!response || response?.errors) return false;

		return true;
	}

	const [isDisplayingPlaylistSelector, setIsDisplayingPlaylistSelector] = useState(false);

	function showPlaylistSelector() {
		setIsDisplayingPlaylistSelector(true);
	}

	function hidePlaylistSelector() {
		setIsDisplayingPlaylistSelector(false);
	}

	const soundtrackRef = useRef();
	function onSoundtrackContainerScroll(e) {
		if (soundtrackRef?.current?.scrollTop === 0 && !isDisplayingPlaylistSelector) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		unit,
		revertSoundtrack,
		saveSoundtrack,
		soundtrackRef,
		onSoundtrackContainerScroll,
		isDisplayingPlaylistSelector,
		showPlaylistSelector,
		hidePlaylistSelector,
		spotify_refresh_token,
	};
};
