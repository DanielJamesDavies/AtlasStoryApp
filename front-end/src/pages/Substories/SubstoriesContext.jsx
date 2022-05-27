import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

export const SubstoriesContext = createContext();

const SubstoriesProvider = ({ children, story_url }) => {
	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);
	const [substories, setSubstories] = useState(false);
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);

	useEffect(() => {
		async function getStoryAndSubstories() {
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
				if (story_response.data.story?.data?.icon) getStoryIcon(story_response.data.story.data.icon);
			}
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
	}, [location, story_url, APIRequest, story, setStory, setStoryIcon]);

	return <SubstoriesContext.Provider value={{ story, storyIcon, substories, setSubstories }}>{children}</SubstoriesContext.Provider>;
};

export default SubstoriesProvider;
