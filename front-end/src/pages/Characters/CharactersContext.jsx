import React, { createContext, useState, useContext, useEffect, useRef } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";

export const CharactersContext = createContext();

const CharactersProvider = ({ children, story_uid }) => {
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);
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

	const curr_story_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return setStateToDefault();
			if (curr_story_uid.current === story_uid) return;
			if (!story || story.uid !== story_uid) return;

			// Document Title
			updateDocumentTitle();
			setTimeout(() => updateDocumentTitle(), 1000);

			if (storyGroups.length > 0) setGroup(storyGroups[0]);
			if (storyCharacterTypes.length > 0) setCharacterType(storyCharacterTypes[0]);
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
	}, [location, story_uid, APIRequest, curr_story_uid, story, storyGroups, setGroup, storyCharacterTypes, setCharacterType]);

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
