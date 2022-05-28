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
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
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

			if (story_url !== story_response.data.story.url) return;

			setStory(story_response.data.story);

			setIsAuthorizedToModify(story_response?.data?.isAuthorizedToModify);

			if (story_response.data.story?.data?.icon) getStoryIcon(story_response.data.story.data.icon);

			// Groups Data
			if (!story_response.data.story?.data?.groups) return;

			let newGroups = await Promise.all(
				story_response.data.story.data.groups.map(async (groupID) => {
					return await getGroup(groupID);
				})
			);
			newGroups = newGroups.filter((e) => e !== false);

			setGroups(newGroups);

			if (story_response?.data?.story?.data?.colours?.accent) changeAccentColour(story_response.data.story.data.colours.accent);
			if (story_response?.data?.story?.data?.colours?.accentHover)
				changeAccentHoverColour(story_response.data.story.data.colours.accentHover);
		}

		async function getStoryIcon(iconID) {
			const response = await APIRequest("/image/" + iconID, "GET");
			if (response?.error || !response?.data?.image) return setStoryIcon(false);
			setStoryIcon(response.data.image);
		}

		async function getGroup(groupID) {
			const group_response = await APIRequest("/group/" + groupID, "GET");
			if (group_response?.errors || !group_response?.data?.group) return false;

			if (!group_response.data.group?.data?.characters) return group_response.data.group;
			group_response.data.group.data.characters = await getGroupCharacters(group_response.data.group.data.characters);

			return group_response.data.group;
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
		changeAccentHoverColour,
	]);

	const [isReorderingGroups, setIsReorderingGroups] = useState(false);
	const [isReorderingCharacters, setIsReorderingCharacters] = useState(false);

	function toggleIsReorderingGroups() {
		setIsReorderingGroups((oldIsReorderingGroups) => !oldIsReorderingGroups);
	}

	function toggleIsReorderingCharacters() {
		setIsReorderingCharacters((oldIsReorderingCharacters) => !oldIsReorderingCharacters);
	}

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
				isReorderingGroups,
				isReorderingCharacters,
				toggleIsReorderingGroups,
				toggleIsReorderingCharacters,
			}}
		>
			{children}
		</CharactersContext.Provider>
	);
};

export default CharactersProvider;
