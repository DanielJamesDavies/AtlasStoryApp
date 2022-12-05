import React, { createContext, useState, useContext, useEffect, useRef } from "react";

import { AppContext } from "../../context/AppContext";
import { APIContext } from "../../context/APIContext";
import { RecentDataContext } from "../../context/RecentDataContext";
import { RoutesContext } from "../../context/RoutesContext";

export const SubstoriesContext = createContext();

const SubstoriesProvider = ({ children, story_uid }) => {
	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);
	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);
	const [substories, setSubstories] = useState([]);
	const [substoriesPosterBackgrounds, setSubstoriesPosterBackgrounds] = useState(false);
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const { location } = useContext(RoutesContext);

	const curr_story_uid = useRef(false);
	const isGetting = useRef({ substoriesPosterBackgrounds: false });
	useEffect(() => {
		async function getStoryAndSubstories() {
			if (!story_uid) return setStateToDefault();
			if (curr_story_uid.current === story_uid) return;

			let newStory = await getStory();
			if (!newStory) return;

			// Document Title
			if (newStory?.data?.title) {
				document.title = "Substories | " + newStory.data.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}

			getSubstories(newStory?.data?.substories);

			if (newStory?.data?.colours?.accent) changeAccentColour(newStory.data.colours.accent);
			if (newStory?.data?.colours?.accentHover) changeAccentHoverColour(newStory.data.colours.accentHover);

			if (newStory?.data?.icon) getStoryIcon(newStory.data.icon);
		}

		function setStateToDefault() {
			setIsAuthorizedToEdit(false);
			setStory(false);
			setStoryIcon(false);
			setSubstories([]);
			setSubstoriesPosterBackgrounds(false);
		}

		async function getStory() {
			const story_response = await APIRequest("/story?uid=" + story_uid + "&story_uid=" + story_uid, "GET");
			if (!story_response?.data?.story || story_response?.error || story_uid !== story_response?.data?.story?.uid) {
				setStateToDefault();
				return false;
			}
			curr_story_uid.current = story_response.data.story.uid;
			setStory(story_response.data.story);
			setIsAuthorizedToEdit(story_response?.data?.isAuthorizedToEdit);
			return story_response.data.story;
		}

		async function getStoryIcon(iconID) {
			if (!iconID) return setStoryIcon(false);
			if (isGetting.storyIcon) return;
			isGetting.storyIcon = true;

			let icon = false;
			const recentImage = recentImages.current.find((e) => e?._id === iconID);
			if (recentImage) {
				icon = recentImage;
			} else {
				const response = await APIRequest("/image/" + iconID, "GET");
				if (response?.error || !response?.data?.image?.image) return setStoryIcon(false);
				icon = response?.data?.image;
			}

			addImagesToRecentImages([icon]);

			setStoryIcon(icon.image);

			return icon;
		}

		async function getSubstories(substoryIDs) {
			let newSubstories = await Promise.all(
				substoryIDs.map(async (substoryID) => {
					if (!substoryID) return false;
					const substory_response = await APIRequest("/substory/" + substoryID + "?story_uid=" + story_uid, "GET");
					if (substory_response?.errors || !substory_response?.data?.substory) return false;
					return substory_response.data.substory;
				})
			);
			newSubstories = newSubstories.filter((e) => e !== false);

			setSubstories(newSubstories);
			getSubstoriesPosterBackgrounds(newSubstories);
		}

		async function getSubstoriesPosterBackgrounds(newSubstories) {
			if (!newSubstories || isGetting?.substoriesPosterBackgrounds) return;
			isGetting.substoriesPosterBackgrounds = true;

			let newSubstoriesPosterBackgrounds = await Promise.all(
				newSubstories.map(async (substory) => {
					if (!substory?.data?.posterBackground) return false;

					const recentImage = recentImages.current.find((e) => e?._id === substory?.data?.posterBackground);
					if (recentImage) return recentImage;

					const poster_background_image_response = await APIRequest("/image/" + substory.data.posterBackground, "GET");
					if (poster_background_image_response?.errors || !poster_background_image_response?.data?.image?.image) return false;
					return poster_background_image_response.data.image;
				})
			);
			newSubstoriesPosterBackgrounds = newSubstoriesPosterBackgrounds.filter((e) => e !== false);

			addImagesToRecentImages(newSubstoriesPosterBackgrounds);

			setSubstoriesPosterBackgrounds(newSubstoriesPosterBackgrounds);
			return newSubstoriesPosterBackgrounds;
		}

		getStoryAndSubstories();

		let reloadTimer = setTimeout(() => getStoryAndSubstories(), 1);
		return () => {
			clearTimeout(reloadTimer);
		};
	}, [
		location,
		story_uid,
		APIRequest,
		recentImages,
		addImagesToRecentImages,
		setIsAuthorizedToEdit,
		curr_story_uid,
		isGetting,
		setStory,
		setStoryIcon,
		setSubstories,
		setSubstoriesPosterBackgrounds,
		changeAccentColour,
		changeAccentHoverColour,
	]);

	const [isDisplayingCreateSubstoryForm, setIsDisplayingCreateSubstoryForm] = useState(false);
	const [isReorderingSubstories, setIsReorderingSubstories] = useState(false);
	function toggleIsReorderingSubstories() {
		setIsReorderingSubstories((oldIsReorderingSubstories) => !oldIsReorderingSubstories);
	}

	return (
		<SubstoriesContext.Provider
			value={{
				isAuthorizedToEdit,
				story_uid,
				story,
				setStory,
				storyIcon,
				substories,
				setSubstories,
				substoriesPosterBackgrounds,
				isDisplayingCreateSubstoryForm,
				setIsDisplayingCreateSubstoryForm,
				isReorderingSubstories,
				toggleIsReorderingSubstories,
			}}
		>
			{children}
		</SubstoriesContext.Provider>
	);
};

export default SubstoriesProvider;
