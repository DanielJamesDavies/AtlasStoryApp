import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { AppContext } from "../../context/AppContext";
import { RoutesContext } from "../../context/RoutesContext";

export const WorldContext = createContext();

const WorldProvider = ({ children, story_url }) => {
	const [isAuthorizedToModify, setIsAuthorizedToModify] = useState(false);
	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);
	const [world, setWorld] = useState(false);
	const { APIRequest } = useContext(APIContext);
	const { changeAccentColour, changeAccentColourHover } = useContext(AppContext);
	const { location } = useContext(RoutesContext);

	useEffect(() => {
		async function getStoryAndWorld() {
			if (!story_url) {
				setStory(false);
				return;
			}
			if (story.url === story_url) return;

			// Story Data
			const story_response = await APIRequest("/story?url=" + story_url, "GET");
			if (!story_response?.data?.story || story_response?.error || story_url !== story_response.data.story.url) {
				setStory(false);
				setStoryIcon(false);
				setIsAuthorizedToModify(false);
				return;
			}

			setStory(story_response.data.story);

			setIsAuthorizedToModify(story_response?.data?.isAuthorizedToModify);

			if (story_response?.data?.story?.data?.colours?.accent) changeAccentColour(story_response.data.story.data.colours.accent);
			if (story_response?.data?.story?.data?.colours?.accentHover)
				changeAccentColourHover(story_response.data.story.data.colours.accentHover);

			if (story_response.data.story?.data?.icon) getStoryIcon(story_response.data.story.data.icon);
		}

		async function getStoryIcon(iconID) {
			const response = await APIRequest("/image/" + iconID, "GET");
			if (response?.error || !response?.data?.image) return setStoryIcon(false);
			setStoryIcon(response.data.image);
		}

		getStoryAndWorld();

		let reloadTimer = setTimeout(() => getStoryAndWorld(), 1);
		return () => {
			clearTimeout(reloadTimer);
		};
	}, [location, story_url, APIRequest, setIsAuthorizedToModify, story, setStory, setStoryIcon, changeAccentColour, changeAccentColourHover]);

	return <WorldContext.Provider value={{ isAuthorizedToModify, story, storyIcon, world, setWorld }}>{children}</WorldContext.Provider>;
};

export default WorldProvider;
