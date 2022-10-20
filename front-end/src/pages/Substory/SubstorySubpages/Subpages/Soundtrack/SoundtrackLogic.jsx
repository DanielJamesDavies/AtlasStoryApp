// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../SubstoryContext";
import { APIContext } from "../../../../../context/APIContext";
import { SpotifyContext } from "../../../../../context/SpotifyContext";

// Services

// Styles

// Assets

export const SoundtrackLogic = () => {
	const { isAuthorizedToEdit, story, substory, setSubstory, substorySoundtrack, setSubstorySoundtrack } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);
	const { spotify_refresh_token } = useContext(SpotifyContext);

	async function revertSoundtrack() {
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "soundtrack"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newSubstory = JSON.parse(JSON.stringify(substory));
		newSubstory.data.soundtrack = response.data.value;
		setSubstory(newSubstory);

		if (substorySoundtrack) {
			let newSubstorySoundtrack = JSON.parse(JSON.stringify(substorySoundtrack));
			newSubstorySoundtrack.tracks = newSubstorySoundtrack.tracks.map((track) => {
				let newTrackIndex = response.data.value?.tracks?.findIndex((e) => e.uri === track.uri);
				if (newTrackIndex === -1) return track;
				let newTrack = JSON.parse(JSON.stringify(track));
				newTrack.text = response.data.value?.tracks[newTrackIndex].text;
				return newTrack;
			});
			setSubstorySoundtrack(newSubstorySoundtrack);
		}

		return true;
	}

	async function saveSoundtrack() {
		let newSoundtrack = JSON.parse(JSON.stringify(substory)).data.soundtrack;
		let newSubstorySoundtrack = JSON.parse(JSON.stringify(substorySoundtrack));

		if (!newSubstorySoundtrack) newSubstorySoundtrack = { playlist_id: newSoundtrack.playlist_id, tracks: [] };
		newSubstorySoundtrack.tracks = newSubstorySoundtrack?.tracks.map((track) => {
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

		newSubstorySoundtrack.tracks = newSubstorySoundtrack.tracks.concat(newSoundtrack.tracks);

		for (let i = newSubstorySoundtrack.tracks.length - 1; i > 0; i--) {
			if (newSubstorySoundtrack.tracks.findIndex((e, index) => index !== i && e.uri === newSubstorySoundtrack.tracks[i].uri) !== -1) {
				newSubstorySoundtrack.tracks.splice(i, 1);
			}
		}

		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "soundtrack"],
			newValue: newSubstorySoundtrack,
		});
		if (!response || response?.errors) return false;

		return true;
	}

	const soundtrackRef = useRef();
	function onSoundtrackContainerScroll(e) {
		if (soundtrackRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return { isAuthorizedToEdit, revertSoundtrack, saveSoundtrack, soundtrackRef, onSoundtrackContainerScroll };
};
