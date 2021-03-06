import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { AppContext } from "../../context/AppContext";
import { RoutesContext } from "../../context/RoutesContext";

export const SubstoriesContext = createContext();

const SubstoriesProvider = ({ children, story_uid }) => {
	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);
	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);
	const [substories, setSubstories] = useState(false);
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
			const story_response = await APIRequest("/story?uid=" + story_uid, "GET");
			if (!story_response?.data?.story || story_response?.error || story_uid !== story_response.data.story.uid) {
				setStory(false);
				setStoryIcon(false);
				setIsAuthorizedToEdit(false);
				return;
			}

			setStory(story_response.data.story);

			setIsAuthorizedToEdit(story_response?.data?.isAuthorizedToEdit);

			if (story_response?.data?.story?.data?.colours?.accent) changeAccentColour(story_response.data.story.data.colours.accent);
			if (story_response?.data?.story?.data?.colours?.accentHover)
				changeAccentHoverColour(story_response.data.story.data.colours.accentHover);

			if (story_response.data.story?.data?.icon) getStoryIcon(story_response.data.story.data.icon);
		}

		async function getStoryIcon(iconID) {
			const response = await APIRequest("/image/" + iconID, "GET");
			if (response?.error || !response?.data?.image) return setStoryIcon(false);
			setStoryIcon(response.data.image);
		}

		getStoryAndSubstories();

		let reloadTimer = setTimeout(() => getStoryAndSubstories(), 1);
		return () => {
			clearTimeout(reloadTimer);
		};
	}, [location, story_uid, APIRequest, setIsAuthorizedToEdit, story, setStory, setStoryIcon, changeAccentColour, changeAccentHoverColour]);

	return (
		<SubstoriesContext.Provider value={{ isAuthorizedToEdit, story, storyIcon, substories, setSubstories }}>
			{children}
		</SubstoriesContext.Provider>
	);
};

export default SubstoriesProvider;
