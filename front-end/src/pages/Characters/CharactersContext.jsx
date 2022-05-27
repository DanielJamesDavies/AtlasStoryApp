import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { AppContext } from "../../context/AppContext";
import { RoutesContext } from "../../context/RoutesContext";

export const CharactersContext = createContext();

const CharactersProvider = ({ children, story_url }) => {
	const [isAuthorizedToModify, setIsAuthorizedToModify] = useState(false);
	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);
	const [groups, setGroups] = useState(false);
	const [openGroup, setOpenGroup] = useState(0);
	const [isDisplayingCreateGroupForm, setIsDisplayingCreateGroupForm] = useState(false);
	const [isDisplayingCreateCharacterForm, setIsDisplayingCreateCharacterForm] = useState(false);
	const { APIRequest } = useContext(APIContext);
	const { changeAccentColour, changeAccentColourHover } = useContext(AppContext);
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
			if (!story_response?.data?.story || story_response?.error || story_response?.data?.story?.url !== story_url) {
				setStory(false);
				setStoryIcon(false);
				setGroups(false);
				setIsAuthorizedToModify(false);
				return;
			}

			setIsAuthorizedToModify(story_response?.data?.isAuthorizedToModify);

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

			if (story_url !== story_response.data.story.url) return;

			setStory(story_response.data.story);

			if (story_response?.data?.story?.data?.colours?.accent) changeAccentColour(story_response.data.story.data.colours.accent);
			if (story_response?.data?.story?.data?.colours?.accentHover)
				changeAccentColourHover(story_response.data.story.data.colours.accentHover);

			setGroups(group_response.data.groups);

			if (story_response.data.story?.data?.icon) getStoryIcon(story_response.data.story.data.icon);
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
	}, [
		location,
		story_url,
		APIRequest,
		setIsAuthorizedToModify,
		story,
		setStory,
		setStoryIcon,
		groups,
		setGroups,
		changeAccentColour,
		changeAccentColourHover,
	]);

	return (
		<CharactersContext.Provider
			value={{
				isAuthorizedToModify,
				story,
				storyIcon,
				groups,
				setGroups,
				openGroup,
				setOpenGroup,
				isDisplayingCreateGroupForm,
				setIsDisplayingCreateGroupForm,
				isDisplayingCreateCharacterForm,
				setIsDisplayingCreateCharacterForm,
			}}
		>
			{children}
		</CharactersContext.Provider>
	);
};

export default CharactersProvider;
