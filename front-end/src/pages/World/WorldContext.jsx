import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

export const WorldContext = createContext();

const WorldProvider = ({ children, story_url }) => {
	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);
	const [world, setWorld] = useState(false);
	const { APIRequest } = useContext(APIContext);
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
			if (!story_response?.data?.story || story_response?.error) {
				setStory(false);
				return;
			}

			if (story_url === story_response.data.story.url) {
				setStory(story_response.data.story);
				if (story_response.data.story?.icon) getStoryIcon(story_response.data.story.icon);
			}
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
	}, [location, story_url, APIRequest, story, setStory, setStoryIcon]);

	return <WorldContext.Provider value={{ story, storyIcon, world, setWorld }}>{children}</WorldContext.Provider>;
};

export default WorldProvider;
