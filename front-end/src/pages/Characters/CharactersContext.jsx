import React, { createContext, useState, useContext, useEffect, useRef } from "react";

import { AppContext } from "../../context/AppContext";
import { APIContext } from "../../context/APIContext";
import { RecentDataContext } from "../../context/RecentDataContext";
import { RoutesContext } from "../../context/RoutesContext";

export const CharactersContext = createContext();

const CharactersProvider = ({ children, story_uid }) => {
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const { location } = useContext(RoutesContext);

	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);

	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);

	const [groups, setGroups] = useState([]);
	const [group, setGroup] = useState(false);

	const [characters, setCharacters] = useState([]);

	const [characterTypes, setCharacterTypes] = useState([]);
	const [characterType, setCharacterType] = useState(false);

	const [characterRelationships, setCharacterRelationships] = useState([]);
	const [characterRelationshipsAddedIds, setCharacterRelationshipsAddedIds] = useState([]);
	const [characterRelationshipsRemovedIds, setCharacterRelationshipsRemovedIds] = useState([]);
	const [characterRelationshipsCharacters, setCharacterRelationshipsCharacters] = useState(false);
	const [selectedCharacterRelationshipsCharacterId, setSelectedCharacterRelationshipsCharacterId] = useState(false);
	const [relationshipsFilters, setRelationshipsFilters] = useState(false);

	const [charactersCardBackgrounds, setCharactersCardBackgrounds] = useState(false);
	const [charactersFaceImages, setCharactersFaceImages] = useState(false);

	const hasReloaded = useRef(false);
	const curr_story_uid = useRef(false);
	const isGetting = useRef({ storyIcon: false, characterRelationships: false, charactersCardBackgrounds: false, charactersFaceImages: false });

	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return setStateToDefault();
			if (!hasReloaded.current) return (hasReloaded.current = true);
			if (curr_story_uid.current === story_uid) return;

			let newStory = await getStory();
			if (!newStory) return;

			changeAccentColour(newStory?.data?.colours?.accent);
			changeAccentHoverColour(newStory?.data?.colours?.accentHover);

			getStoryIcon(newStory?.data?.icon);

			// Document Title
			if (newStory?.data?.title) {
				document.title = "Characters | " + newStory?.data?.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}

			let newGroups = await getGroups(newStory?.data?.groups);
			if (!newGroups) return;

			if (newGroups.length > 0) setGroup(newGroups[0]);

			getCharacterRelationships(newStory._id);

			let newCharacters = await getGroupCharacters(newGroups);

			getCharactersCardBackgrounds(newCharacters);
			getCharactersFaceImages(newCharacters);

			let newCharacterTypes = await getCharacterTypes(newStory?.data?.characterTypes);
			if (newCharacterTypes.length > 0) setCharacterType(newCharacterTypes[0]);
		}

		function setStateToDefault() {
			setIsAuthorizedToEdit(false);
			setStory(false);
			setStoryIcon(false);
			setGroups(false);
			setGroup(false);
			setCharacters([]);
			setCharacterTypes([]);
			setCharacterType(false);
			setCharactersCardBackgrounds([]);
		}

		async function getStory() {
			const story_response = await APIRequest("/story?uid=" + story_uid + "&story_uid=" + story_uid, "GET");
			if (!story_response?.data?.story || story_response?.error || story_response?.data?.story?.uid !== story_uid) {
				setStateToDefault();
				return false;
			}
			curr_story_uid.current = story_response?.data?.story?.uid;
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

		async function getGroups(groupIDs) {
			if (!groupIDs) return false;
			let newGroups = await Promise.all(
				groupIDs.map(async (groupID) => {
					if (!groupID) return false;
					const group_response = await APIRequest("/group/" + groupID + "?story_uid=" + story_uid, "GET");
					if (group_response?.errors || !group_response?.data?.group) return false;
					return group_response.data.group;
				})
			);
			newGroups = newGroups.filter((e) => e !== false);
			setGroups(newGroups);
			return newGroups;
		}

		async function getGroupCharacters(newGroups) {
			if (!newGroups) return;

			let newCharacters = await Promise.all(
				newGroups.map(async (group) => {
					if (!group?.data?.characters) return false;
					let characters = await Promise.all(
						group.data.characters.map(async (group_character) => {
							const character_response = await APIRequest(
								"/character/" + group_character.character_id + "?card=true&story_uid=" + story_uid,
								"GET"
							);
							if (character_response?.errors || !character_response?.data?.character) return false;
							return character_response.data.character;
						})
					);
					return characters.filter((e) => e !== false);
				})
			);
			newCharacters = newCharacters.flat(1);
			newCharacters = newCharacters.filter((e) => e !== false);
			setCharacters(newCharacters);
			return newCharacters;
		}

		async function getCharacterRelationships(story_id) {
			if (!story_id || isGetting.characterRelationships) return false;
			isGetting.characterRelationships = true;

			let character_relationships_response = await APIRequest("/character-relationship?story_id=" + story_id, "GET");
			if (
				!character_relationships_response ||
				character_relationships_response?.errors ||
				!character_relationships_response?.data?.characterRelationships
			)
				return false;

			setCharacterRelationships(character_relationships_response.data.characterRelationships);
			return character_relationships_response.data.characterRelationships;
		}

		async function getCharactersCardBackgrounds(newCharacters) {
			if (!newCharacters || isGetting.charactersCardBackgrounds) return;
			isGetting.charactersCardBackgrounds = true;

			let newCharactersCardBackgrounds = await Promise.all(
				newCharacters.map(async (character) => {
					if (!character?.data?.cardBackground) return false;

					const recentImage = recentImages.current.find((e) => e?._id === character?.data?.cardBackground);
					if (recentImage) return recentImage;

					const card_background_image_response = await APIRequest("/image/" + character.data.cardBackground, "GET");
					if (card_background_image_response?.errors || !card_background_image_response?.data?.image?.image) return false;
					return card_background_image_response.data.image;
				})
			);
			newCharactersCardBackgrounds = newCharactersCardBackgrounds.filter((e) => e !== false);

			addImagesToRecentImages(newCharactersCardBackgrounds);

			setCharactersCardBackgrounds(newCharactersCardBackgrounds);
			return newCharactersCardBackgrounds;
		}

		async function getCharactersFaceImages(newCharacters) {
			if (!newCharacters || isGetting.charactersFaceImages) return;
			isGetting.charactersFaceImages = true;

			let newCharactersFaceImages = await Promise.all(
				newCharacters.map(async (character) => {
					if (!character?.data?.faceImage) return false;

					const recentImage = recentImages.current.find((e) => e?._id === character?.data?.faceImage);
					if (recentImage) return recentImage;

					const face_image_response = await APIRequest("/image/" + character.data.faceImage, "GET");
					if (face_image_response?.errors || !face_image_response?.data?.image?.image) return false;
					return face_image_response.data.image;
				})
			);
			newCharactersFaceImages = newCharactersFaceImages.filter((e) => e !== false);

			addImagesToRecentImages(newCharactersFaceImages);

			setCharactersFaceImages(newCharactersFaceImages);
			return newCharactersFaceImages;
		}

		async function getCharacterTypes(characterTypesIDs) {
			if (!characterTypesIDs) return;
			let newCharacterTypes = await Promise.all(
				characterTypesIDs.map(async (characterTypeID) => {
					const character_type_response = await APIRequest("/character-type/" + characterTypeID + "?story_uid=" + story_uid, "GET");
					if (character_type_response?.errors || !character_type_response?.data?.characterType) return false;
					return character_type_response.data.characterType;
				})
			);
			newCharacterTypes = newCharacterTypes.filter((e) => e !== false);

			setCharacterTypes(newCharacterTypes);
			return newCharacterTypes;
		}

		getInitial();

		let reloadTimer = setTimeout(() => getInitial(), 50);
		return () => clearTimeout(reloadTimer);
	}, [
		location,
		story_uid,
		APIRequest,
		setIsAuthorizedToEdit,
		hasReloaded,
		curr_story_uid,
		recentImages,
		addImagesToRecentImages,
		setStory,
		setStoryIcon,
		setGroups,
		setCharacters,
		setCharacterTypes,
		setCharacterType,
		setCharacterRelationships,
		setCharactersCardBackgrounds,
		setCharactersFaceImages,
		changeAccentColour,
		changeAccentHoverColour,
		isGetting,
	]);

	const [isDisplayingCreateGroupForm, setIsDisplayingCreateGroupForm] = useState(false);
	const [isReorderingGroups, setIsReorderingGroups] = useState(false);
	function toggleIsReorderingGroups() {
		setIsReorderingGroups((oldIsReorderingGroups) => !oldIsReorderingGroups);
	}

	function changeGroup(newGroupID, newGroups) {
		const newGroup = newGroups !== undefined ? newGroups?.find((e) => e._id === newGroupID) : groups?.find((e) => e._id === newGroupID);
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
				: characterTypes?.find((e) => e._id === newCharacterTypeID);
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
				groups,
				setGroups,
				group,
				setGroup,
				changeGroup,
				characters,
				setCharacters,
				characterTypes,
				setCharacterTypes,
				characterType,
				setCharacterType,
				changeCharacterType,
				characterRelationships,
				setCharacterRelationships,
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
				charactersCardBackgrounds,
				charactersFaceImages,
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
