import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";

export const CharactersContext = createContext();

const CharactersProvider = ({ children, story_uid }) => {
	const { APIRequest } = useContext(APIContext);
	const { location, changeLocationParameters } = useContext(RoutesContext);
	const {
		isAuthorizedToEdit,
		story,
		setStory,
		storyIcon,
		storyGroups,
		setStoryGroups,
		storyCharacters,
		setStoryCharacters,
		storyCharacterRelationships,
		setStoryCharacterRelationships,
		storyCharacterTypes,
		setStoryCharacterTypes,
	} = useContext(StoryContext);

	const [group, setGroup] = useState(false);

	const [characterType, setCharacterType] = useState(false);

	const [characterRelationshipsAddedIds, setCharacterRelationshipsAddedIds] = useState([]);
	const [characterRelationshipsRemovedIds, setCharacterRelationshipsRemovedIds] = useState([]);
	const [characterRelationshipsCharacters, setCharacterRelationshipsCharacters] = useState(false);
	const [selectedCharacterRelationshipsCharacterId, setSelectedCharacterRelationshipsCharacterId] = useState(false);
	const [relationshipsFilters, setRelationshipsFilters] = useState(false);

	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return setStateToDefault();
			if (!story || story.uid !== story_uid) return;

			// Document Title
			updateDocumentTitle();
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "characters") updateDocumentTitle();
			}, 500);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "characters") updateDocumentTitle();
			}, 750);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "characters") updateDocumentTitle();
			}, 1000);

			if (storyGroups.length > 0) {
				setGroup((oldGroup) => {
					const currStoryIndex = storyGroups.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(oldGroup._id));
					return storyGroups[currStoryIndex === -1 ? 0 : currStoryIndex];
				});
			}

			if (storyCharacterTypes.length > 0) {
				setCharacterType((oldCharacterType) => {
					const currTypeIndex = storyCharacterTypes.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(oldCharacterType._id));
					return storyCharacterTypes[currTypeIndex === -1 ? 0 : currTypeIndex];
				});
			}
		}

		function updateDocumentTitle() {
			if (story?.data?.title) {
				document.title = "Characters | " + story?.data?.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		function setStateToDefault() {
			setGroup(false);
			setCharacterType(false);
			setCharacterRelationshipsAddedIds([]);
			setCharacterRelationshipsRemovedIds([]);
			setCharacterRelationshipsCharacters(false);
			setSelectedCharacterRelationshipsCharacterId(false);
			setRelationshipsFilters(false);
		}

		getInitial();
	}, [location, story_uid, APIRequest, story, storyGroups, setGroup, storyCharacterTypes, setCharacterType]);

	const [isDisplayingCreateGroupForm, setIsDisplayingCreateGroupForm] = useState(false);
	const [isReorderingGroups, setIsReorderingGroups] = useState(false);
	function toggleIsReorderingGroups() {
		setIsReorderingGroups((oldIsReorderingGroups) => !oldIsReorderingGroups);
	}

	function changeGroup(newGroupID, newGroups) {
		const newGroup = newGroups !== undefined ? newGroups?.find((e) => e._id === newGroupID) : storyGroups?.find((e) => e._id === newGroupID);
		if (!newGroup) return setGroup(false);
		setGroup(newGroup);
	}

	const [isDisplayingCreateCharacterForm, setIsDisplayingCreateCharacterForm] = useState(false);
	const [isReorderingCharacters, setIsReorderingCharacters] = useState(false);
	function toggleIsReorderingCharacters() {
		setIsReorderingCharacters((oldIsReorderingCharacters) => !oldIsReorderingCharacters);
	}

	const [isDisplayingCreateCharacterTypeForm, setIsDisplayingCreateCharacterTypeForm] = useState(false);
	const [isReorderingCharacterTypes, setIsReorderingCharacterTypes] = useState(false);
	function toggleIsReorderingCharacterTypes() {
		setIsReorderingCharacterTypes((oldIsReorderingCharacterTypes) => !oldIsReorderingCharacterTypes);
	}

	function changeCharacterType(newCharacterTypeID, newCharacterTypes) {
		const newCharacterType =
			newCharacterTypes !== undefined
				? newCharacterTypes?.find((e) => e._id === newCharacterTypeID)
				: storyCharacterTypes?.find((e) => e._id === newCharacterTypeID);
		if (!newCharacterType) return setCharacterType(false);
		setCharacterType(newCharacterType);
	}

	useEffect(() => {
		changeLocationParameters([]);
	}, [changeLocationParameters]);

	return (
		<CharactersContext.Provider
			value={{
				isAuthorizedToEdit,
				story_uid,
				story,
				setStory,
				storyIcon,
				storyGroups,
				setStoryGroups,
				group,
				setGroup,
				changeGroup,
				storyCharacters,
				setStoryCharacters,
				storyCharacterTypes,
				setStoryCharacterTypes,
				characterType,
				setCharacterType,
				changeCharacterType,
				storyCharacterRelationships,
				setStoryCharacterRelationships,
				characterRelationshipsAddedIds,
				setCharacterRelationshipsAddedIds,
				characterRelationshipsRemovedIds,
				setCharacterRelationshipsRemovedIds,
				characterRelationshipsCharacters,
				setCharacterRelationshipsCharacters,
				selectedCharacterRelationshipsCharacterId,
				setSelectedCharacterRelationshipsCharacterId,
				relationshipsFilters,
				setRelationshipsFilters,
				isDisplayingCreateGroupForm,
				setIsDisplayingCreateGroupForm,
				isReorderingGroups,
				toggleIsReorderingGroups,
				isDisplayingCreateCharacterForm,
				setIsDisplayingCreateCharacterForm,
				isReorderingCharacters,
				toggleIsReorderingCharacters,
				isDisplayingCreateCharacterTypeForm,
				setIsDisplayingCreateCharacterTypeForm,
				isReorderingCharacterTypes,
				toggleIsReorderingCharacterTypes,
			}}
		>
			{children}
		</CharactersContext.Provider>
	);
};

export default CharactersProvider;
