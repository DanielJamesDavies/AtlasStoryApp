import React, { createContext, useState, useContext, useEffect, useMemo, useRef } from "react";

import { AppContext } from "../../context/AppContext";
import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

export const CharacterContext = createContext();

const CharacterProvider = ({ children, story_uid, character_uid }) => {
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);

	const [failure, setFailure] = useState(false);

	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);

	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);

	const [character, setCharacter] = useState(false);

	const [characterTypes, setCharacterTypes] = useState([]);
	const [groups, setGroups] = useState([]);

	const [characterOverviewBackground, setCharacterOverviewBackground] = useState(false);
	const [characterCardBackground, setCharacterCardBackground] = useState(false);
	const [characterImages, setCharacterImages] = useState([]);

	const [characterVersion, setCharacterVersion] = useState(false);

	const [isOnOverviewSection, setIsOnOverviewSection] = useState(true);
	// 	{ id: "relationships", name: "Relationships", isEnabled: true },
	const allSubpages = useMemo(
		() => [
			{ id: "gallery", name: "Gallery", isEnabled: true },
			{ id: "psychology", name: "Psychology", isEnabled: true },
			{ id: "biography", name: "Biography", isEnabled: true },
			{ id: "abilities", name: "Abilities & Equipment", isEnabled: true },
			{ id: "physical", name: "Physical", isEnabled: true },
			{ id: "miscellaneous", name: "Miscellaneous", isEnabled: true },
			{ id: "development", name: "Development", isEnabled: true },
			{ id: "settings", name: "Settings", isEnabled: true },
		],
		[]
	);
	const [subpages, setSubpages] = useState([]);
	const [openSubpageID, setOpenSubpageID] = useState(false);

	const hasGotData = useRef({ characterOverviewBackground: false, characterCardBackground: false, characterImages: false });
	useEffect(() => {
		async function getInitial() {
			if (failure || !story_uid || !character_uid) {
				setStateToDefault();
				return;
			}
			if (story.uid === story_uid && character.uid === character_uid) return;

			let { newStory, newIsAuthorizedToEdit } = await getStory();
			if (!newStory) return;

			changeAccentColour(newStory?.data?.colours?.accent);
			changeAccentHoverColour(newStory?.data?.colours?.accentHover);

			getStoryIcon(newStory?.data?.icon);
			getCharacterTypes(newStory?.data?.characterTypes, newStory?._id);
			getGroups(newStory?.data?.groups);

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
			getCharacterImages(newCharacter?.data?.images);

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
		}

		async function getStory() {
			const story_response = await APIRequest("/story?uid=" + story_uid + "&story_uid=" + story_uid, "GET");
			if (!story_response?.data?.story || story_response?.error || story_response?.data?.story?.uid !== story_uid) {
				setStateToDefault();
				return false;
			}
			setStory(story_response.data.story);
			setIsAuthorizedToEdit(story_response?.data?.isAuthorizedToEdit);
			return { newStory: story_response.data.story, newIsAuthorizedToEdit: story_response?.data?.isAuthorizedToEdit };
		}

		async function getStoryIcon(iconID) {
			if (!iconID) return setStoryIcon(false);
			const response = await APIRequest("/image/" + iconID, "GET");
			if (response?.error || !response?.data?.image?.image) return setStoryIcon(false);

			setStoryIcon(response.data.image.image);
			return response.data.image.image;
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

		async function getGroups(groupIDs) {
			if (!groupIDs) return;
			let newGroups = await Promise.all(
				groupIDs.map(async (groupID) => {
					const group_response = await APIRequest("/group/" + groupID, "GET");
					if (group_response?.errors || !group_response?.data?.group) return false;
					return { _id: group_response.data.group._id, data: { name: group_response.data.group.data.name } };
				})
			);
			newGroups = newGroups.filter((e) => e !== false);

			setGroups(newGroups);
			return newGroups;
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
			if (hasGotData?.characterOverviewBackground === true) return true;
			if (!overviewBackgroundID) return;

			const overview_background_image_response = await APIRequest("/image/" + overviewBackgroundID, "GET");
			if (overview_background_image_response?.errors || !overview_background_image_response?.data?.image?.image) return false;

			setCharacterOverviewBackground(overview_background_image_response.data.image.image);
			hasGotData.characterOverviewBackground = true;
			return overview_background_image_response.data.image.image;
		}

		async function getCharacterCardBackground(cardBackgroundID) {
			if (hasGotData?.characterCardBackground === true) return true;
			if (!cardBackgroundID) return false;

			const card_background_image_response = await APIRequest("/image/" + cardBackgroundID, "GET");
			if (card_background_image_response?.errors || !card_background_image_response?.data?.image?.image) return false;

			setCharacterCardBackground(card_background_image_response.data.image.image);
			hasGotData.characterCardBackground = true;
			return card_background_image_response.data.image.image;
		}

		async function getCharacterImages(imageIDs) {
			if (hasGotData?.characterImages === true) return true;
			if (!imageIDs) return false;

			let newCharacterImages = await Promise.all(
				imageIDs.map(async (imageID) => {
					const image_response = await APIRequest("/image/" + imageID, "GET");
					if (image_response?.errors || !image_response?.data?.image?.image) return false;
					return image_response.data.image;
				})
			);
			newCharacterImages = newCharacterImages.filter((e) => e !== false);

			setCharacterImages(newCharacterImages);
			hasGotData.characterImages = true;
		}

		getInitial();

		let reloadTimer = setTimeout(() => getInitial(), 50);
		return () => clearTimeout(reloadTimer);
	}, [
		location,
		story_uid,
		character_uid,
		APIRequest,
		failure,
		setFailure,
		setIsAuthorizedToEdit,
		story,
		setStory,
		setStoryIcon,
		character,
		setCharacter,
		setCharacterTypes,
		setGroups,
		allSubpages,
		setSubpages,
		setOpenSubpageID,
		setCharacterOverviewBackground,
		setCharacterCardBackground,
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
				characterOverviewBackground,
				setCharacterOverviewBackground,
				characterCardBackground,
				setCharacterCardBackground,
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
			}}
		>
			{children}
		</CharacterContext.Provider>
	);
};

export default CharacterProvider;
