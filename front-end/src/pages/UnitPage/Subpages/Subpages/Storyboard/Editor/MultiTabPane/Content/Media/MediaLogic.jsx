// Packages
import { useContext, useRef, useState } from "react";
import Fuse from "fuse.js";

// Components

// Logic

// Context
import { StoryboardContext } from "../../../../StoryboardContext";
import { SpotifyContext } from "../../../../../../../../../context/SpotifyContext";
import { APIContext } from "../../../../../../../../../context/APIContext";

// Services
import getImageFromFile from "../../../../../../../../../services/GetImageFromFile";

// Styles

// Assets

export const MediaLogic = () => {
	const {
		playerHeight,
		content_simple,
		content_images,
		playlists,
		setPlaylists,
		tracks,
		setTracks,
		spotifyPlaylists,
		spotifyTracks,
		setContentImages,
	} = useContext(StoryboardContext);
	const { SpotifyRequest } = useContext(SpotifyContext);
	const { APIRequest } = useContext(APIContext);

	const [searchMusicResults, setSearchMusicResults] = useState([]);
	const [searchMusicValue, setSearchMusicValue] = useState("");
	const [searchMusicPage, setSearchMusicPage] = useState(0);

	const searchMusicTimeout = useRef();

	function onSearchMusicChange(e) {
		setSearchMusicValue(e?.target?.value);

		clearTimeout(searchMusicTimeout?.current);

		searchMusicTimeout.current = setTimeout(async () => {
			if (e?.target?.value?.trim()?.length === 0) return setSearchMusicResults([]);

			let newSearchMusicResults = [];

			const tracks_res = await SpotifyRequest("/search?q=" + encodeURI(e?.target?.value) + "&type=track&limit=10");
			newSearchMusicResults = newSearchMusicResults.concat(tracks_res?.tracks?.items);

			const playlists_res = await SpotifyRequest("/search?q=" + encodeURI(e?.target?.value) + "&type=playlist&limit=10");
			newSearchMusicResults = newSearchMusicResults.concat(playlists_res?.playlists?.items);

			const fuse = new Fuse(newSearchMusicResults, {
				keys: ["name"],
				includeScore: true,
				findAllMatches: true,
			});

			const fuseSearchMusicResults = fuse.search(searchMusicValue?.trim()).map(({ item }) => item);

			newSearchMusicResults = fuseSearchMusicResults.concat(
				newSearchMusicResults?.filter((e) => fuseSearchMusicResults?.findIndex((e2) => e2.id === e.id) === -1)
			);

			setSearchMusicPage(0);
			setSearchMusicResults(newSearchMusicResults);
		}, 500);
	}

	function changeSearchMusicPage(direction) {
		setSearchMusicPage((oldValue) =>
			Math.min(searchMusicResults?.length, oldValue * 4 + 4) >= searchMusicResults?.length && direction > 0
				? oldValue
				: Math.max(0, oldValue + direction)
		);
	}

	function onClickSearchMusicItem(item) {
		setSearchMusicResults([]);
		setSearchMusicPage(0);
		setSearchMusicValue("");

		switch (item?.type) {
			case "playlist":
				setPlaylists((oldValue) => {
					let newValue = JSON.parse(JSON.stringify(oldValue));
					newValue.push({ id: item?.id, uri: item?.uri, source: "spotify" });
					return newValue;
				});
				break;
			case "track":
				setTracks((oldValue) => {
					let newValue = JSON.parse(JSON.stringify(oldValue));
					newValue.push({ id: item?.id, uri: item?.uri, source: "spotify" });
					return newValue;
				});
				break;
			default:
				break;
		}
	}

	const addImageInputRef = useRef();

	async function onAddImageInputChange(e) {
		const image = await getImageFromFile(e.target.files[0], { maxFileSizeInKBs: undefined });
		addImageInputRef.current.value = [];
		if (image?.error || !image?.data) return false;

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		const image_size = new Promise((resolve) => {
			const img = new Image();
			img.onload = () => {
				resolve({ width: img.width, height: img.height });
			};
			img.onerror = resolve({ width: 400, height: 400 });
			img.src = image.data;
		});

		setContentImages((oldValue) =>
			oldValue.concat([
				{
					id: new_id_response?.data?._id,
					image: image?.data,
					width: image_size?.width,
					height: image_size?.height,
				},
			])
		);
	}

	return {
		playerHeight,
		content_simple,
		content_images,
		playlists,
		tracks,
		spotifyPlaylists,
		spotifyTracks,
		searchMusicResults,
		searchMusicValue,
		onSearchMusicChange,
		searchMusicPage,
		changeSearchMusicPage,
		onClickSearchMusicItem,
		addImageInputRef,
		onAddImageInputChange,
	};
};
