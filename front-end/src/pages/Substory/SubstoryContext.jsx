import React, { createContext, useState, useContext, useEffect, useMemo, useRef, useCallback } from "react";

import { AppContext } from "../../context/AppContext";
import { APIContext } from "../../context/APIContext";
import { RecentDataContext } from "../../context/RecentDataContext";
import { RoutesContext } from "../../context/RoutesContext";
import { SpotifyContext } from "../../context/SpotifyContext";
import { StoryContext } from "../../context/StoryContext";

export const SubstoryContext = createContext();

const SubstoryProvider = ({ children, story_uid, substory_uid }) => {
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const { location, locationParams, changeLocationParameters } = useContext(RoutesContext);
	const { spotify_access_token, spotify_refresh_token, SpotifyRequest } = useContext(SpotifyContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon } = useContext(StoryContext);

	const [failure, setFailure] = useState(false);

	const [substory, setSubstory] = useState(false);

	const [substoryPrimaryImage, setSubstoryPrimaryImage] = useState(false);
	const [substoryOverviewBackground, setSubstoryOverviewBackground] = useState(false);
	const [substoryPosterBackground, setSubstoryPosterBackground] = useState(false);
	const [substoryImages, setSubstoryImages] = useState([]);
	const [substorySoundtrack, setSubstorySoundtrack] = useState(false);

	const [isOnOverviewSection, setIsOnOverviewSection] = useState(true);
	const allSubpages = useMemo(
		() => [
			{ id: "plot", name: "Plot", isEnabled: true },
			{ id: "soundtrack", name: "Soundtrack", isEnabled: true },
			{ id: "gallery", name: "Gallery", isEnabled: true },
			{ id: "miscellaneous", name: "Miscellaneous", isEnabled: true },
			{ id: "development", name: "Development", isEnabled: true },
			{ id: "settings", name: "Settings", isEnabled: true },
		],
		[]
	);
	const [subpages, setSubpages] = useState([]);
	const [openSubpageID, setOpenSubpageID] = useState(false);

	const curr_story_uid = useRef(false);
	const curr_substory_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (failure || !story_uid || !substory_uid) return setStateToDefault();
			if (curr_story_uid.current === story_uid && curr_substory_uid.current === substory_uid) return;
			if (!story || story.uid !== story_uid) return;
			curr_story_uid.current = story?.uid;

			let newSubstory = await getSubstory(story._id);
			if (!newSubstory) return;

			// Document Title
			if (story?.data?.title && newSubstory?.data?.title) {
				document.title = newSubstory?.data?.title + " | " + story?.data?.title + " | Substory | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}

			getSubstorySubpages(newSubstory?.data?.subpages, isAuthorizedToEdit);
			getSubstoryPrimaryImage(newSubstory?.data?.primaryImage);
			getSubstoryOverviewBackground(newSubstory?.data?.overviewBackground);
			getSubstoryPosterBackground(newSubstory?.data?.posterBackground);
			getSubstoryImages(newSubstory?.data?.images);
			getSubstorySoundtrack(newSubstory?.data?.soundtrack?.playlist_id, newSubstory?.data?.soundtrack?.tracks);
		}

		function setStateToDefault() {
			setSubstory(false);
			setSubstoryOverviewBackground(false);
			setSubstoryPosterBackground(false);
		}

		async function getSubstory(story_id) {
			if (!story_id) return;
			const substory_response = await APIRequest("/substory?uid=" + substory_uid + "&story_id=" + story_id, "GET");
			if (!substory_response?.data?.substory || substory_response?.error || substory_response?.data?.substory?.uid !== substory_uid) {
				setStateToDefault();
				setFailure(true);
				return false;
			}
			curr_substory_uid.current = substory_response?.data?.substory?.uid;
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

		async function getSubstoryPrimaryImage(primaryImageID) {
			if (!primaryImageID) return;

			let primaryImage = false;

			const recentImage = recentImages.current.find((e) => e?._id === primaryImageID);
			if (recentImage?.image) {
				primaryImage = recentImage;
			} else {
				const primary_image_response = await APIRequest("/image/" + primaryImageID, "GET");
				if (primary_image_response?.errors || !primary_image_response?.data?.image?.image) {
					setSubstoryOverviewBackground("NO_IMAGE");
					return false;
				}
				primaryImage = primary_image_response?.data?.image;
			}

			addImagesToRecentImages([primaryImage]);

			setSubstoryPrimaryImage(primaryImage.image);
			return primaryImage.image;
		}

		async function getSubstoryOverviewBackground(overviewBackgroundID) {
			if (!overviewBackgroundID) return;

			let overviewBackground = false;

			const recentImage = recentImages.current.find((e) => e?._id === overviewBackgroundID);
			if (recentImage?.image) {
				overviewBackground = recentImage;
			} else {
				const overview_background_image_response = await APIRequest("/image/" + overviewBackgroundID, "GET");
				if (overview_background_image_response?.errors || !overview_background_image_response?.data?.image?.image) {
					setSubstoryOverviewBackground("NO_IMAGE");
					return false;
				}
				overviewBackground = overview_background_image_response?.data?.image;
			}

			addImagesToRecentImages([overviewBackground]);

			setSubstoryOverviewBackground(overviewBackground.image);
			return overviewBackground.image;
		}

		async function getSubstoryPosterBackground(posterBackgroundID) {
			if (!posterBackgroundID) return;

			let posterBackground = false;

			const recentImage = recentImages.current.find((e) => e?._id === posterBackgroundID);
			if (recentImage?.image) {
				posterBackground = recentImage;
			} else {
				const poster_background_image_response = await APIRequest("/image/" + posterBackgroundID, "GET");
				if (poster_background_image_response?.errors || !poster_background_image_response?.data?.image?.image) return false;
				posterBackground = poster_background_image_response?.data?.image;
			}

			addImagesToRecentImages([posterBackground]);

			setSubstoryPosterBackground(posterBackground.image);
			return posterBackground.image;
		}

		async function getSubstoryImages(imageIDs) {
			if (!imageIDs) return;

			let newSubstoryImages = await Promise.all(
				imageIDs.map(async (imageID) => {
					if (!imageID) return false;

					const recentImage = recentImages.current.find((e) => e?._id === imageID);
					if (recentImage) return recentImage;

					const image_response = await APIRequest("/image/" + imageID, "GET");
					if (image_response?.errors || !image_response?.data?.image?.image) return false;
					return image_response.data.image;
				})
			);
			newSubstoryImages = newSubstoryImages.filter((e) => e !== false);

			addImagesToRecentImages(newSubstoryImages);

			setSubstoryImages(newSubstoryImages);
			return newSubstoryImages;
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
	}, [
		location,
		story_uid,
		story,
		substory_uid,
		curr_story_uid,
		curr_substory_uid,
		APIRequest,
		recentImages,
		addImagesToRecentImages,
		SpotifyRequest,
		failure,
		setFailure,
		isAuthorizedToEdit,
		allSubpages,
		setSubstory,
		setOpenSubpageID,
		setSubstoryPrimaryImage,
		setSubstoryOverviewBackground,
		setSubstoryPosterBackground,
		setSubstoryImages,
		setSubstorySoundtrack,
		changeAccentColour,
		changeAccentHoverColour,
	]);

	const updateSubstorySoundtrackFromSpotify = useCallback(async () => {
		const newSubstory = JSON.parse(JSON.stringify(substory));
		const playlist_id = newSubstory?.data?.soundtrack?.playlist_id;
		if (!playlist_id) return false;

		let old_tracks = JSON.parse(JSON.stringify(newSubstory))?.data?.soundtrack?.tracks;
		if (substorySoundtrack) old_tracks = JSON.parse(JSON.stringify(substorySoundtrack))?.tracks;
		if (!old_tracks) return false;

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

		setSubstorySoundtrack({ playlist_id, tracks });
	}, [substory, SpotifyRequest, substorySoundtrack]);

	const old_spotify_tokens = useRef({});

	useEffect(() => {
		if (
			old_spotify_tokens.current?.access_token !== spotify_access_token &&
			old_spotify_tokens.current?.refresh_token !== spotify_refresh_token
		) {
			old_spotify_tokens.current = { access_token: spotify_access_token, refresh_token: spotify_refresh_token };
			updateSubstorySoundtrackFromSpotify();
		}
	}, [spotify_access_token, spotify_refresh_token, old_spotify_tokens, updateSubstorySoundtrackFromSpotify]);

	const hasReadInitialLocationParameters = useRef(false);

	useEffect(() => {
		if (substory) {
			if (!hasReadInitialLocationParameters.current) {
				if (locationParams.current.findIndex((e) => e.label === "subpage") !== -1) {
					setIsOnOverviewSection(false);
					setOpenSubpageID(locationParams.current.find((e) => e.label === "subpage").value);
				}
				setTimeout(() => (hasReadInitialLocationParameters.current = true), 500);
			} else {
				let newLocationParameters = [];
				if (!isOnOverviewSection) newLocationParameters.push({ label: "subpage", value: openSubpageID });
				changeLocationParameters(newLocationParameters);
			}
		}
	}, [changeLocationParameters, hasReadInitialLocationParameters, locationParams, isOnOverviewSection, openSubpageID, substory]);

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
				substoryPrimaryImage,
				setSubstoryPrimaryImage,
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
				updateSubstorySoundtrackFromSpotify,
			}}
		>
			{children}
		</SubstoryContext.Provider>
	);
};

export default SubstoryProvider;
