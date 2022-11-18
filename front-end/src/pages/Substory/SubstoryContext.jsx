import React, { createContext, useState, useContext, useEffect, useMemo } from "react";

import { AppContext } from "../../context/AppContext";
import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";
import { SpotifyContext } from "../../context/SpotifyContext";

export const SubstoryContext = createContext();

const SubstoryProvider = ({ children, story_uid, substory_uid }) => {
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);
	const { SpotifyRequest } = useContext(SpotifyContext);

	const [failure, setFailure] = useState(false);

	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);

	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);

	const [substory, setSubstory] = useState(false);

	const [substoryOverviewBackground, setSubstoryOverviewBackground] = useState(false);
	const [substoryPosterBackground, setSubstoryPosterBackground] = useState(false);
	const [substoryImages, setSubstoryImages] = useState([]);
	const [substorySoundtrack, setSubstorySoundtrack] = useState(false);

	const [isOnOverviewSection, setIsOnOverviewSection] = useState(true);
	// const subpages = [
	// 	{ id: "characters", name: "Characters", isEnabled: true },
	// 	{ id: "locations", name: "Locations", isEnabled: true },
	// 	{ id: "miscellaneous", name: "Miscellaneous", isEnabled: true },
	// ];
	const allSubpages = useMemo(
		() => [
			{ id: "gallery", name: "Gallery", isEnabled: true },
			{ id: "plot", name: "Plot", isEnabled: true },
			{ id: "soundtrack", name: "Soundtrack", isEnabled: true },
			{ id: "development", name: "Development", isEnabled: true },
			{ id: "settings", name: "Settings", isEnabled: true },
		],
		[]
	);
	const [subpages, setSubpages] = useState([]);
	const [openSubpageID, setOpenSubpageID] = useState(false);

	useEffect(() => {
		async function getInitial() {
			if (failure || !story_uid || !substory_uid) {
				setStateToDefault();
				return;
			}
			if (story.uid === story_uid && substory.uid === substory_uid) return;

			let { newStory, newIsAuthorizedToEdit } = await getStory();
			if (!newStory) return;

			changeAccentColour(newStory?.data?.colours?.accent);
			changeAccentHoverColour(newStory?.data?.colours?.accentHover);

			getStoryIcon(newStory?.data?.icon);

			let newSubstory = await getSubstory(newStory._id);
			if (!newSubstory) return;

			// Document Title
			if (newStory?.data?.title && newSubstory?.data?.title) {
				document.title = newSubstory?.data?.title + " | " + newStory?.data?.title + " | Substory | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}

			getSubstorySubpages(newSubstory?.data?.subpages, newIsAuthorizedToEdit);
			getSubstoryOverviewBackground(newSubstory?.data?.overviewBackground);
			getSubstoryPosterBackground(newSubstory?.data?.posterBackground);
			getSubstoryImages(newSubstory?.data?.images);
			getSubstorySoundtrack(newSubstory?.data?.soundtrack?.playlist_id, newSubstory?.data?.soundtrack?.tracks);
		}

		function setStateToDefault() {
			setIsAuthorizedToEdit(false);
			setStory(false);
			setStoryIcon(false);
			setSubstory(false);
			setSubstoryOverviewBackground(false);
			setSubstoryPosterBackground(false);
		}

		async function getStory() {
			const story_response = await APIRequest("/story?uid=" + story_uid + "&story_uid=" + story_uid, "GET");
			if (!story_response?.data?.story || story_response?.error || story_response?.data?.story?.uid !== story_uid) {
				setStateToDefault();
				return false;
			}
			setStory(story_response.data.story);
			setIsAuthorizedToEdit(story_response?.data?.isAuthorizedToEdit);
			return { newStory: story_response.data.story, newIsAuthorizedToEdit: story_response?.data?.isAuthorizedToEdit };
		}

		async function getStoryIcon(iconID) {
			if (!iconID) return setStoryIcon(false);
			const response = await APIRequest("/image/" + iconID, "GET");
			if (response?.error || !response?.data?.image) return setStoryIcon(false);

			setStoryIcon(response.data.image);
			return response.data.image;
		}

		async function getSubstory(story_id) {
			if (!story_id) return;
			const substory_response = await APIRequest("/substory?uid=" + substory_uid + "&story_id=" + story_id, "GET");
			if (!substory_response?.data?.substory || substory_response?.error || substory_response?.data?.substory?.uid !== substory_uid) {
				setStateToDefault();
				setFailure(true);
				return false;
			}
			setSubstory(substory_response.data.substory);
			return substory_response.data.substory;
		}

		function getSubstorySubpages(substorySubpages, isAuthorizedToEdit) {
			let newSubpages = [];

			for (let i = 0; i < substorySubpages.length; i++) {
				let newSubpage = allSubpages.find((e) => e?.id === substorySubpages[i]?.id);
				if (newSubpage) {
					newSubpage.isEnabled = substorySubpages[i]?.isEnabled;
					newSubpages.push(newSubpage);
				}
			}

			newSubpages = newSubpages.concat(allSubpages.filter((e) => newSubpages.findIndex((e2) => e2.id === e.id) === -1));

			setSubpages(newSubpages);
			setOpenSubpageID((oldOpenSubpageID) => {
				if (oldOpenSubpageID !== false) return oldOpenSubpageID;
				return newSubpages.filter((e) => (isAuthorizedToEdit ? e?.isEnabled : e?.isEnabled && e?.id !== "settings"))[0]?.id;
			});
		}

		async function getSubstoryOverviewBackground(overviewBackgroundID) {
			if (!overviewBackgroundID) return;
			const overview_background_image_response = await APIRequest("/image/" + overviewBackgroundID, "GET");
			if (overview_background_image_response?.errors || !overview_background_image_response?.data?.image) return false;

			setSubstoryOverviewBackground(overview_background_image_response.data.image);
			return overview_background_image_response.data.image;
		}

		async function getSubstoryPosterBackground(posterBackgroundID) {
			if (!posterBackgroundID) return;
			const poster_background_image_response = await APIRequest("/image/" + posterBackgroundID, "GET");
			if (poster_background_image_response?.errors || !poster_background_image_response?.data?.image) return false;

			setSubstoryPosterBackground(poster_background_image_response.data.image);
			return poster_background_image_response.data.image;
		}

		async function getSubstoryImages(imageIDs) {
			let newSubstoryImages = await Promise.all(
				imageIDs.map(async (imageID) => {
					const image_response = await APIRequest("/image/" + imageID, "GET");
					if (image_response?.errors || !image_response?.data?.image) return false;
					return image_response.data;
				})
			);
			newSubstoryImages = newSubstoryImages.filter((e) => e !== false);

			setSubstoryImages(newSubstoryImages);
		}

		async function getSubstorySoundtrack(playlist_id, old_tracks) {
			if (!playlist_id) return false;

			const response = await SpotifyRequest("/playlists/" + playlist_id, "GET");
			if (!response || response?.errors) return false;

			let tracks = await Promise.all(
				!response?.tracks?.items
					? null
					: response.tracks.items.map(async (item) => {
							let artwork = undefined;
							if (!item?.is_local) {
								try {
									artwork = await new Promise(async (resolve) => {
										const artwork_response = await fetch(item?.track?.album?.images[0]?.url);
										const reader = new FileReader();
										reader.onloadend = () => resolve(reader.result);
										reader.readAsDataURL(await artwork_response.blob());
									});
								} catch (e) {}
							}

							return {
								id: item?.track?.id,
								uri: item?.track?.uri,
								is_local: item?.is_local,
								name: item?.track?.name,
								album: item?.track?.album?.name,
								artists: item?.track?.artists?.map((artist) => artist?.name).join(","),
								artwork,
								artwork_url: item?.track?.album?.images[0]?.url,
								text:
									old_tracks?.findIndex((e) => e?.uri === item?.track?.uri) === -1
										? [""]
										: old_tracks?.find((e) => e?.uri === item?.track?.uri)?.text,
							};
					  })
			);

			let newSubstorySoundtrack = { playlist_id, tracks };

			setSubstorySoundtrack(newSubstorySoundtrack);
		}

		getInitial();

		let reloadTimer = setTimeout(() => getInitial(), 50);
		return () => clearTimeout(reloadTimer);
	}, [
		location,
		story_uid,
		substory_uid,
		APIRequest,
		SpotifyRequest,
		failure,
		setFailure,
		isAuthorizedToEdit,
		setIsAuthorizedToEdit,
		story,
		setStory,
		setStoryIcon,
		substory,
		allSubpages,
		setSubstory,
		setOpenSubpageID,
		setSubstoryOverviewBackground,
		setSubstoryPosterBackground,
		setSubstoryImages,
		setSubstorySoundtrack,
		changeAccentColour,
		changeAccentHoverColour,
	]);

	return (
		<SubstoryContext.Provider
			value={{
				story_uid,
				substory_uid,
				isAuthorizedToEdit,
				story,
				setStory,
				storyIcon,
				substory,
				setSubstory,
				substoryOverviewBackground,
				setSubstoryOverviewBackground,
				substoryPosterBackground,
				setSubstoryPosterBackground,
				substoryImages,
				setSubstoryImages,
				substorySoundtrack,
				setSubstorySoundtrack,
				isOnOverviewSection,
				setIsOnOverviewSection,
				allSubpages,
				subpages,
				setSubpages,
				openSubpageID,
				setOpenSubpageID,
			}}
		>
			{children}
		</SubstoryContext.Provider>
	);
};

export default SubstoryProvider;
