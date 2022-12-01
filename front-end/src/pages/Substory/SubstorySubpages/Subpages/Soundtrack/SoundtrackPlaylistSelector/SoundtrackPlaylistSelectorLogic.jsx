// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";
import { SpotifyContext } from "../../../../../../context/SpotifyContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RoutesContext } from "../../../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const SoundtrackPlaylistSelectorLogic = ({ isDisplayingPlaylistSelector }) => {
	const { story, substory } = useContext(SubstoryContext);
	const { SpotifyRequest } = useContext(SpotifyContext);
	const { APIRequest } = useContext(APIContext);
	const { domain, location } = useContext(RoutesContext);

	const [playlists, setPlaylists] = useState(false);
	useEffect(() => {
		async function getPlaylists() {
			if (!isDisplayingPlaylistSelector) return setPlaylists(false);
			if (playlists !== false) return true;

			let newPlaylists = [];
			const response = await SpotifyRequest("/me/playlists?limit=50", "GET");
			if (response?.items)
				newPlaylists = newPlaylists.concat(
					response.items.map((playlist) => {
						return {
							id: playlist?.id,
							name: playlist?.name,
							photo_url: !playlist?.images || playlist?.images.length === 0 ? undefined : playlist?.images[0]?.url,
						};
					})
				);
			if (response?.total && response?.total > newPlaylists.length) {
				let iterations = Math.ceil((response?.total - newPlaylists.length) / 50);
				let offsets = [];
				for (let i = 1; i < iterations + 1; i++) offsets.push(i * 50);
				await Promise.all(
					offsets.map(async (offset) => {
						const response = await SpotifyRequest("/me/playlists?limit=50&offset=" + offset, "GET");
						if (!response?.items) return false;
						newPlaylists = newPlaylists.concat(
							response.items.map((playlist) => {
								return {
									id: playlist?.id,
									name: playlist?.name,
									photo_url: !playlist?.images || playlist?.images.length === 0 ? undefined : playlist?.images[0]?.url,
								};
							})
						);
						return true;
					})
				);
			}

			setPlaylists(newPlaylists);

			newPlaylists = await Promise.all(
				newPlaylists.map(async (playlist) => {
					let newPlaylist = JSON.parse(JSON.stringify(playlist));
					if (!newPlaylist?.photo_url) return newPlaylist;
					try {
						newPlaylist.photo = await new Promise(async (resolve) => {
							const photo_response = await fetch(newPlaylist.photo_url);
							const reader = new FileReader();
							reader.onloadend = () => resolve(reader.result);
							reader.readAsDataURL(await photo_response.blob());
						});
					} catch (e) {}
					return newPlaylist;
				})
			);

			setPlaylists(newPlaylists);
		}
		getPlaylists();
	}, [playlists, setPlaylists, isDisplayingPlaylistSelector, SpotifyRequest]);

	async function selectPlaylist(playlist_id) {
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "soundtrack", "playlist_id"],
			newValue: playlist_id,
		});
		if (!response || response?.errors) return false;

		window.location.href = domain + location;
	}

	return { playlists, selectPlaylist };
};
