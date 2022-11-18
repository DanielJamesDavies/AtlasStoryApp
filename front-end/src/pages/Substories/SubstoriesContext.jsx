import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { AppContext } from "../../context/AppContext";
import { RoutesContext } from "../../context/RoutesContext";

export const SubstoriesContext = createContext();

const SubstoriesProvider = ({ children, story_uid }) => {
	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);
	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);
	const [substories, setSubstories] = useState([]);
	const [substoriesPosterBackgrounds, setSubstoriesPosterBackgrounds] = useState(false);
	const { APIRequest } = useContext(APIContext);
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { location } = useContext(RoutesContext);

	useEffect(() => {
		async function getStoryAndSubstories() {
			if (!story_uid) {
				setStory(false);
				return;
			}
			if (story.uid === story_uid) return;

			// Story Data
			const story_response = await APIRequest("/story?uid=" + story_uid + "&story_uid=" + story_uid, "GET");
			if (!story_response?.data?.story || story_response?.error || story_uid !== story_response.data.story.uid) {
				setStory(false);
				setStoryIcon(false);
				setIsAuthorizedToEdit(false);
				return;
			}

			setStory(story_response.data.story);
			getSubstories(story_response.data.story?.data?.substories);

			setIsAuthorizedToEdit(story_response?.data?.isAuthorizedToEdit);

			if (story_response?.data?.story?.data?.colours?.accent) changeAccentColour(story_response.data.story.data.colours.accent);
			if (story_response?.data?.story?.data?.colours?.accentHover)
				changeAccentHoverColour(story_response.data.story.data.colours.accentHover);

			if (story_response.data.story?.data?.icon) getStoryIcon(story_response.data.story.data.icon);

			// Document Title
			if (story_response?.data?.story?.data?.title) {
				document.title = "Substories | " + story_response.data.story.data.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		async function getStoryIcon(iconID) {
			const response = await APIRequest("/image/" + iconID, "GET");
			if (response?.error || !response?.data?.image?.image) return setStoryIcon(false);
			setStoryIcon(response.data.image.image);
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
			if (!newSubstories) return;

			let newSubstoriesPosterBackgrounds = await Promise.all(
				newSubstories.map(async (substory) => {
					if (!substory?.data?.posterBackground) return false;
					const poster_background_image_response = await APIRequest("/image/" + substory.data.posterBackground, "GET");
					if (poster_background_image_response?.errors || !poster_background_image_response?.data?.image?.image) return false;
					return poster_background_image_response.data.image;
				})
			);
			newSubstoriesPosterBackgrounds = newSubstoriesPosterBackgrounds.filter((e) => e !== false);

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
		setIsAuthorizedToEdit,
		story,
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
