import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

export const CharactersContext = createContext();

const CharactersProvider = ({ children, story_url }) => {
	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);
	const [groups, setGroups] = useState(false);
	const [openGroup, setOpenGroup] = useState(0);
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);

	useEffect(() => {
		async function getStoryAndGroups() {
			if (!story_url) {
				setStory(false);
				setGroups(false);
				return;
			}
			if (story.url === story_url) return;

			// Story Data
			const story_response = await APIRequest("/story?url=" + story_url, "GET");
			if (!story_response?.data?.story || story_response?.error) {
				setStory(false);
				setGroups(false);
				return;
			}

			// Groups Data
			const group_response = await APIRequest("/group?story_id=" + story_response.data.story?._id, "GET");
			if (!group_response?.data?.groups || group_response?.error) {
				setStory(false);
				setGroups(false);
				return;
			}

			group_response.data.groups = await Promise.all(
				group_response.data.groups.map(async (group) => {
					group.data.characters = await getGroupCharacters(group.data.characters);
					return group;
				})
			);

			if (story_url === story_response.data.story.url) {
				setStory(story_response.data.story);
				setGroups(group_response.data.groups);
				if (story_response.data.story?.data?.icon) getStoryIcon(story_response.data.story.data.icon);
			}
		}

		async function getStoryIcon(iconID) {
			const response = await APIRequest("/image/" + iconID, "GET");
			if (response?.error || !response?.data?.image) return setStoryIcon(false);
			setStoryIcon(response.data.image);
		}

		async function getGroupCharacters(groupCharacters) {
			let characters = await Promise.all(
				groupCharacters.map(async (group_character) => {
					const character_response = await APIRequest("/character/" + group_character.user_id, "GET");
					if (character_response?.errors || !character_response?.data?.character) return false;
					return character_response.data.character;
				})
			);
			return characters.filter((e) => e !== false);
		}

		getStoryAndGroups();

		let reloadTimer = setTimeout(() => getStoryAndGroups(), 1);
		return () => {
			clearTimeout(reloadTimer);
		};
	}, [location, story_url, APIRequest, story, setStory, setStoryIcon, groups, setGroups]);

	return (
		<CharactersContext.Provider value={{ story, storyIcon, groups, setGroups, openGroup, setOpenGroup }}>{children}</CharactersContext.Provider>
	);
};

export default CharactersProvider;
