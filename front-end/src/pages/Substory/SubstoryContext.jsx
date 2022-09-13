import React, { createContext, useState, useContext, useEffect } from "react";

import { AppContext } from "../../context/AppContext";
import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

export const SubstoryContext = createContext();

const SubstoryProvider = ({ children, story_uid, substory_uid }) => {
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);

	const [failure, setFailure] = useState(false);

	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);

	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);

	const [substory, setSubstory] = useState(false);

	const [substoryOverviewBackground, setSubstoryOverviewBackground] = useState(false);
	const [substoryPosterBackground, setSubstoryPosterBackground] = useState(false);
	const [substoryImages, setSubstoryImages] = useState([]);

	const [isOnOverviewSection, setIsOnOverviewSection] = useState(true);
	// const subpages = [
	// 	{ id: "gallery", name: "Gallery" },
	// 	{ id: "plot", name: "Plot" },
	// 	{ id: "characters", name: "Characters" },
	// 	{ id: "locations", name: "Locations" },
	// 	{ id: "miscellaneous", name: "Miscellaneous" },
	// 	{ id: "development", name: "Development" },
	// 	{ id: "settings", name: "Settings" },
	// ];
	const subpages = [{ id: "gallery", name: "Gallery" }];
	const [openSubpageID, setOpenSubpageID] = useState(subpages[0].id);

	useEffect(() => {
		async function getInitial() {
			if (failure || !story_uid || !substory_uid) {
				setStateToDefault();
				return;
			}
			if (story.uid === story_uid && substory.uid === substory_uid) return;

			let newStory = await getStory();
			if (!newStory) return;

			changeAccentColour(newStory?.data?.colours?.accent);
			changeAccentHoverColour(newStory?.data?.colours?.accentHover);

			getStoryIcon(newStory?.data?.icon);

			let newSubstory = await getSubstory(newStory._id);
			if (!newSubstory) return;

			getSubstoryOverviewBackground(newSubstory?.data?.overviewBackground);
			getSubstoryPosterBackground(newSubstory?.data?.posterBackground);
			getSubstoryImages(newSubstory?.data?.images);
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
			const story_response = await APIRequest("/story?uid=" + story_uid, "GET");
			if (!story_response?.data?.story || story_response?.error || story_response?.data?.story?.uid !== story_uid) {
				setStateToDefault();
				return false;
			}
			setStory(story_response.data.story);
			setIsAuthorizedToEdit(story_response?.data?.isAuthorizedToEdit);
			return story_response.data.story;
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

		getInitial();

		let reloadTimer = setTimeout(() => getInitial(), 50);
		return () => clearTimeout(reloadTimer);
	}, [
		location,
		story_uid,
		substory_uid,
		APIRequest,
		failure,
		setFailure,
		setIsAuthorizedToEdit,
		story,
		setStory,
		setStoryIcon,
		substory,
		setSubstory,
		setSubstoryOverviewBackground,
		setSubstoryPosterBackground,
		setSubstoryImages,
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
				isOnOverviewSection,
				setIsOnOverviewSection,
				subpages,
				openSubpageID,
				setOpenSubpageID,
			}}
		>
			{children}
		</SubstoryContext.Provider>
	);
};

export default SubstoryProvider;
