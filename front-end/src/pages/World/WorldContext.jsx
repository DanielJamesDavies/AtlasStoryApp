import React, { createContext, useState, useContext, useEffect, useRef } from "react";

import { AppContext } from "../../context/AppContext";
import { APIContext } from "../../context/APIContext";
import { RecentDataContext } from "../../context/RecentDataContext";
import { RoutesContext } from "../../context/RoutesContext";

export const WorldContext = createContext();

const WorldProvider = ({ children, story_uid }) => {
	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);
	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);
	const [world, setWorld] = useState(false);
	const { APIRequest } = useContext(APIContext);
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const { location } = useContext(RoutesContext);

	const hasReloaded = useRef(false);
	const curr_story_uid = useRef(false);
	const isGetting = useRef({ storyIcon: false, substoriesPosterBackgrounds: false });

	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return setStateToDefault();
			if (!hasReloaded.current) return (hasReloaded.current = true);
			if (curr_story_uid === story_uid) return;

			let newStory = await getStory();
			if (!newStory) return;

			if (newStory?.data?.colours?.accent) changeAccentColour(newStory.data.colours.accent);
			if (newStory?.data?.colours?.accentHover) changeAccentHoverColour(newStory.data.colours.accentHover);

			if (newStory?.data?.icon) getStoryIcon(newStory.data.icon);

			// Document Title
			if (newStory?.data?.title) {
				document.title = "World | " + newStory.data.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		function setStateToDefault() {
			setIsAuthorizedToEdit(false);
			setStory(false);
			setStoryIcon(false);
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

		getInitial();

		let reloadTimer = setTimeout(() => getInitial(), 1);
		return () => {
			clearTimeout(reloadTimer);
		};
	}, [
		location,
		story_uid,
		hasReloaded,
		curr_story_uid,
		isGetting,
		APIRequest,
		recentImages,
		addImagesToRecentImages,
		setIsAuthorizedToEdit,
		story,
		setStory,
		setStoryIcon,
		changeAccentColour,
		changeAccentHoverColour,
	]);

	return <WorldContext.Provider value={{ isAuthorizedToEdit, story, storyIcon, world, setWorld }}>{children}</WorldContext.Provider>;
};

export default WorldProvider;
