import React, { createContext, useState, useContext, useEffect, useMemo, useRef } from "react";

import { AppContext } from "../../context/AppContext";
import { APIContext } from "../../context/APIContext";
import { RecentDataContext } from "../../context/RecentDataContext";
import { RoutesContext } from "../../context/RoutesContext";

export const CharacterContext = createContext();

const CharacterProvider = ({ children, story_uid, character_uid }) => {
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const { location } = useContext(RoutesContext);

	const [failure, setFailure] = useState(false);

	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);

	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);

	const [character, setCharacter] = useState(false);

	const [characterTypes, setCharacterTypes] = useState([]);
	const [groups, setGroups] = useState([]);
	const [characters, setCharacters] = useState([]);

	const [characterOverviewBackground, setCharacterOverviewBackground] = useState(false);
	const [characterCardBackground, setCharacterCardBackground] = useState(false);
	const [characterFaceImage, setCharacterFaceImage] = useState(false);
	const [characterImages, setCharacterImages] = useState([]);

	const [characterRelationships, setCharacterRelationships] = useState([]);
	const [characterRelationshipsAddedIds, setCharacterRelationshipsAddedIds] = useState([]);
	const [characterRelationshipsRemovedIds, setCharacterRelationshipsRemovedIds] = useState([]);
	const [characterRelationshipsCharacters, setCharacterRelationshipsCharacters] = useState(false);
	const [selectedCharacterRelationshipsCharacterId, setSelectedCharacterRelationshipsCharacterId] = useState(false);
	const [relationshipsFilters, setRelationshipsFilters] = useState(false);

	const [characterVersion, setCharacterVersion] = useState(false);

	const [isOnOverviewSection, setIsOnOverviewSection] = useState(true);
	const allSubpages = useMemo(
		() => [
			{ id: "gallery", name: "Gallery", isEnabled: true },
			{ id: "psychology", name: "Psychology", isEnabled: true },
			{ id: "biography", name: "Biography", isEnabled: true },
			{ id: "abilities", name: "Abilities & Equipment", isEnabled: true },
			{ id: "physical", name: "Physical", isEnabled: true },
			{ id: "relationships", name: "Relationships", isEnabled: true },
			{ id: "miscellaneous", name: "Miscellaneous", isEnabled: true },
			{ id: "development", name: "Development", isEnabled: true },
			{ id: "settings", name: "Settings", isEnabled: true },
		],
		[]
	);
	const [subpages, setSubpages] = useState([]);
	const [openSubpageID, setOpenSubpageID] = useState(false);
	const [characterPaddingTop, setCharacterPaddingTop] = useState(0);

	const curr_story_uid = useRef(false);
	const curr_character_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (failure || !story_uid || !character_uid) return setStateToDefault();
			if (curr_story_uid.current === story_uid && curr_character_uid.current === character_uid) return;

			let { newStory, newIsAuthorizedToEdit } = await getStory();
			if (!newStory) return;

			changeAccentColour(newStory?.data?.colours?.accent);
			changeAccentHoverColour(newStory?.data?.colours?.accentHover);

			getStoryIcon(newStory?.data?.icon);
			getCharacterTypes(newStory?.data?.characterTypes, newStory?._id);
			getGroups(newStory?.data?.groups, newStory?._id);

			let newCharacter = await getCharacter(newStory._id);
			if (!newCharacter) return;

			// Document Title
			if (newCharacter?.data?.name && newStory?.data?.title) {
				document.title = newCharacter?.data?.name + " | " + newStory?.data?.title + " | Characters | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}

			getCharacterSubpages(newCharacter?.data?.subpages, newIsAuthorizedToEdit);
			getCharacterOverviewBackground(newCharacter?.data?.overviewBackground);
			getCharacterCardBackground(newCharacter?.data?.cardBackground);
			getCharacterFaceImage(newCharacter?.data?.faceImage);
			getCharacterImages(newCharacter?.data?.images);
			getCharacterRelationships(newStory._id, newCharacter?._id);

			if (newCharacter?.data?.versions[0]) setCharacterVersion(newCharacter.data.versions[0]);
		}

		function setStateToDefault() {
			setIsAuthorizedToEdit(false);
			setStory(false);
			setStoryIcon(false);
			setCharacter(false);
			setCharacterTypes([]);
			setCharacterOverviewBackground(false);
			setCharacterCardBackground(false);
			setCharacterFaceImage(false);
		}

		async function getStory() {
			const story_response = await APIRequest("/story?uid=" + story_uid + "&story_uid=" + story_uid, "GET");
			if (!story_response?.data?.story || story_response?.error || story_response?.data?.story?.uid !== story_uid) {
				setStateToDefault();
				return false;
			}
			setStory(story_response.data.story);
			curr_story_uid.current = story_response?.data?.story?.uid;
			setIsAuthorizedToEdit(story_response?.data?.isAuthorizedToEdit);
			return { newStory: story_response.data.story, newIsAuthorizedToEdit: story_response?.data?.isAuthorizedToEdit };
		}

		async function getStoryIcon(iconID) {
			if (!iconID) return setStoryIcon(false);

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
		}

		async function getCharacter(story_id) {
			if (!story_id) return;
			const character_response = await APIRequest("/character?uid=" + character_uid + "&story_id=" + story_id, "GET");
			if (!character_response?.data?.character || character_response?.error || character_response?.data?.character?.uid !== character_uid) {
				setStateToDefault();
				setFailure(true);
				return false;
			}
			setCharacter((oldCharacter) => {
				if (oldCharacter._id === character_response.data.character._id) return oldCharacter;
				return character_response.data.character;
			});
			return character_response.data.character;
		}

		async function getCharacterTypes(characterTypesIDs, story_id) {
			if (!characterTypesIDs) return;

			let newCharacterTypes = await Promise.all(
				characterTypesIDs.map(async (characterTypeID) => {
					const character_type_response = await APIRequest("/character-type/" + characterTypeID + "?story_id=" + story_id, "GET");
					if (character_type_response?.errors || !character_type_response?.data?.characterType) return false;
					return character_type_response.data.characterType;
				})
			);
			newCharacterTypes = newCharacterTypes.filter((e) => e !== false);

			setCharacterTypes(newCharacterTypes);
			return newCharacterTypes;
		}

		async function getGroups(groupIDs, story_id) {
			if (!groupIDs || !story_id) return;

			let newGroups = await Promise.all(
				groupIDs.map(async (groupID) => {
					const group_response = await APIRequest("/group/" + groupID + "?story_id=" + story_id, "GET");
					if (group_response?.errors || !group_response?.data?.group) return false;
					return {
						_id: group_response.data.group._id,
						data: { name: group_response.data.group.data.name, characters: group_response.data.group.data.characters },
					};
				})
			);
			newGroups = newGroups.filter((e) => e !== false);

			setGroups(newGroups);

			getCharacters(newGroups, story_id);

			return newGroups;
		}

		async function getCharacters(groups, story_id) {
			if (!story_id) return false;

			let newCharacters = (
				await Promise.all(
					groups.map(async (group) => {
						return await Promise.all(
							group?.data?.characters?.map(async (group_character) => {
								const character_response = await APIRequest(
									"/character/" + group_character.character_id + "?card=true&story_id=" + story_id,
									"GET"
								);
								if (character_response?.errors || !character_response?.data?.character) return false;
								let newCharacter = JSON.parse(JSON.stringify(character_response.data.character));
								if (newCharacter?.data?.faceImage) {
									const recentImage = recentImages.current.find((e) => e?._id === newCharacter?.data?.faceImage);
									if (recentImage) {
										newCharacter.data.faceImage = recentImage;
									} else {
										const face_image_response = await APIRequest("/image/" + newCharacter.data.faceImage, "GET");
										newCharacter.data.faceImage = face_image_response?.data?.image;
									}
								}
								return newCharacter;
							})
						);
					})
				)
			)
				.flat(1)
				.filter((e) => e !== false);

			setCharacters(newCharacters);

			const characterIndex = newCharacters.findIndex((e) => e.uid === character_uid);
			const firstNewCharacterRelationshipsCharacters = JSON.parse(JSON.stringify(newCharacters)).slice(characterIndex);
			const lastNewCharacterRelationshipsCharacters = JSON.parse(JSON.stringify(newCharacters)).slice(0, characterIndex);
			const newCharacterRelationshipsCharacters = firstNewCharacterRelationshipsCharacters.concat(lastNewCharacterRelationshipsCharacters);

			setCharacterRelationshipsCharacters(newCharacterRelationshipsCharacters);
		}

		function getCharacterSubpages(characterSubpages, isAuthorizedToEdit) {
			let newSubpages = [];

			for (let i = 0; i < characterSubpages.length; i++) {
				let newSubpage = allSubpages.find((e) => e.id === characterSubpages[i].id);
				if (newSubpage) {
					newSubpage.isEnabled = characterSubpages[i]?.isEnabled;
					newSubpages.push(newSubpage);
				}
			}
			newSubpages = newSubpages.concat(allSubpages.filter((e) => newSubpages.findIndex((e2) => e2.id === e.id) === -1));

			setSubpages(newSubpages);
			setOpenSubpageID((oldOpenSubpageID) => {
				if (oldOpenSubpageID !== false) return oldOpenSubpageID;
				return newSubpages.filter((e) => (isAuthorizedToEdit ? e?.isEnabled : e?.isEnabled && e?.id !== "settings"))[0]?.id;
			});
		}

		async function getCharacterOverviewBackground(overviewBackgroundID) {
			if (!overviewBackgroundID) return;

			let overviewBackground = false;

			const recentImage = recentImages.current.find((e) => e?._id === overviewBackgroundID);
			if (recentImage?.image) {
				overviewBackground = recentImage;
			} else {
				const overview_background_image_response = await APIRequest("/image/" + overviewBackgroundID, "GET");
				if (overview_background_image_response?.errors || !overview_background_image_response?.data?.image?.image) return false;
				overviewBackground = overview_background_image_response?.data?.image;
			}

			addImagesToRecentImages([overviewBackground]);

			setCharacterOverviewBackground(overviewBackground.image);
			return overviewBackground.image;
		}

		async function getCharacterCardBackground(cardBackgroundID) {
			if (!cardBackgroundID) return;

			let cardBackground = false;

			const recentImage = recentImages.current.find((e) => e?._id === cardBackgroundID);
			if (recentImage?.image) {
				cardBackground = recentImage;
			} else {
				const card_background_image_response = await APIRequest("/image/" + cardBackgroundID, "GET");
				if (card_background_image_response?.errors || !card_background_image_response?.data?.image?.image) return false;
				cardBackground = card_background_image_response?.data?.image;
			}

			addImagesToRecentImages([cardBackground]);

			setCharacterCardBackground(cardBackground.image);
			return cardBackground.image;
		}

		async function getCharacterFaceImage(faceImageID) {
			if (!faceImageID) return;

			let faceImage = false;

			const recentImage = recentImages.current.find((e) => e?._id === faceImageID);
			if (recentImage?.image) {
				faceImage = recentImage;
			} else {
				const face_image_response = await APIRequest("/image/" + faceImageID, "GET");
				if (face_image_response?.errors || !face_image_response?.data?.image?.image) return false;
				faceImage = face_image_response?.data?.image;
			}

			addImagesToRecentImages([faceImage]);

			setCharacterFaceImage(faceImage.image);
			return faceImage.image;
		}

		async function getCharacterImages(imageIDs) {
			if (!imageIDs) return;

			let newCharacterImages = await Promise.all(
				imageIDs.map(async (imageID) => {
					if (!imageID) return false;

					const recentImage = recentImages.current.find((e) => e?._id === imageID);
					if (recentImage) return recentImage;

					const image_response = await APIRequest("/image/" + imageID, "GET");
					if (image_response?.errors || !image_response?.data?.image?.image) return false;
					return image_response.data.image;
				})
			);
			newCharacterImages = newCharacterImages.filter((e) => e !== false);

			addImagesToRecentImages(newCharacterImages);

			setCharacterImages(newCharacterImages);
		}

		async function getCharacterRelationships(story_id, character_id) {
			if (!story_id || !character_id) return false;

			let character_relationships_response = await APIRequest(
				"/character-relationship?story_id=" + story_id + "&character_id=" + character_id,
				"GET"
			);
			if (
				!character_relationships_response ||
				character_relationships_response?.errors ||
				!character_relationships_response?.data?.characterRelationships
			)
				return false;

			setCharacterRelationships(character_relationships_response.data.characterRelationships);
			return character_relationships_response.data.characterRelationships;
		}

		getInitial();
	}, [
		location,
		story_uid,
		character_uid,
		curr_story_uid,
		curr_character_uid,
		APIRequest,
		recentImages,
		addImagesToRecentImages,
		failure,
		setFailure,
		setIsAuthorizedToEdit,
		setStory,
		setStoryIcon,
		setCharacter,
		setCharacterTypes,
		setGroups,
		allSubpages,
		setSubpages,
		setOpenSubpageID,
		setCharacterOverviewBackground,
		setCharacterCardBackground,
		setCharacterFaceImage,
		setCharacterImages,
		changeAccentColour,
		changeAccentHoverColour,
	]);

	function changeCharacterVersion(newCharacterVersion) {
		setCharacterVersion(newCharacterVersion);
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const characterVersionIndex = newCharacter.data.versions.findIndex((e) => e._id === newCharacterVersion._id);
			if (characterVersionIndex !== -1) newCharacter.data.versions[characterVersionIndex] = newCharacterVersion;
			return newCharacter;
		});
	}

	function decrementCharacterVersion() {
		if (!character?.data?.versions) return;
		const currentVersionIndex = character.data.versions.findIndex((e) => e._id === characterVersion._id);
		if (currentVersionIndex === -1 || currentVersionIndex === 0) return;
		setCharacterVersion(character.data.versions[currentVersionIndex - 1]);
	}

	function incrementCharacterVersion() {
		if (!character?.data?.versions) return;
		const currentVersionIndex = character.data.versions.findIndex((e) => e._id === characterVersion._id);
		if (currentVersionIndex === -1 || currentVersionIndex === character.data.versions.length - 1) return;
		setCharacterVersion(character?.data?.versions[currentVersionIndex + 1]);
	}

	return (
		<CharacterContext.Provider
			value={{
				story_uid,
				character_uid,
				isAuthorizedToEdit,
				story,
				setStory,
				storyIcon,
				character,
				setCharacter,
				characterTypes,
				setCharacterTypes,
				groups,
				setGroups,
				characters,
				setCharacters,
				characterOverviewBackground,
				setCharacterOverviewBackground,
				characterCardBackground,
				setCharacterCardBackground,
				characterFaceImage,
				setCharacterFaceImage,
				characterImages,
				setCharacterImages,
				characterVersion,
				setCharacterVersion,
				changeCharacterVersion,
				decrementCharacterVersion,
				incrementCharacterVersion,
				isOnOverviewSection,
				setIsOnOverviewSection,
				subpages,
				setSubpages,
				allSubpages,
				openSubpageID,
				setOpenSubpageID,
				characterPaddingTop,
				setCharacterPaddingTop,
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
			}}
		>
			{children}
		</CharacterContext.Provider>
	);
};

export default CharacterProvider;
