import React, { createContext, useState, useContext, useEffect } from "react";

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
	const [characterGalleryImages, setCharacterGalleryImages] = useState([]);

	const [characterVersion, setCharacterVersion] = useState(false);

	const [isOnOverviewSection, setIsOnOverviewSection] = useState(true);
	const subpages = [
		{ id: "gallery", name: "Gallery" },
		{ id: "psychology", name: "Psychology" },
		{ id: "efforts", name: "Efforts & History" },
		{ id: "abilities", name: "Abilities" },
		{ id: "physical", name: "Physical" },
		{ id: "relationships", name: "Relationships" },
		{ id: "miscellaneous", name: "Miscellaneous" },
		{ id: "development", name: "Development" },
		{ id: "settings", name: "Settings" },
	];
	const [openSubpageID, setOpenSubpageID] = useState(subpages[0].id);

	useEffect(() => {
		async function getInitial() {
			if (failure || !story_uid || !character_uid) {
				setStateToDefault();
				return;
			}
			if (story.uid === story_uid && character.uid === character_uid) return;

			let newStory = await getStory();
			if (!newStory) return;

			changeAccentColour(newStory?.data?.colours?.accent);
			changeAccentHoverColour(newStory?.data?.colours?.accentHover);

			getStoryIcon(newStory?.data?.icon);
			getCharacterTypes(newStory?.data?.characterTypes);
			getGroups(newStory?.data?.groups);

			let newCharacter = await getCharacter(newStory._id);
			if (!newCharacter) return;

			getCharacterOverviewBackground(newCharacter?.data?.overviewBackground);
			getCharacterCardBackground(newCharacter?.data?.cardBackground);
			getCharacterGalleryImages(newCharacter?.data?.versions);

			if (newCharacter?.data?.versions[0]) setCharacterVersion(newCharacter.data.versions[0]);
		}

		function setStateToDefault() {
			setIsAuthorizedToEdit(false);
			setStory(false);
			setStoryIcon(false);
			setCharacter(false);
			setCharacterTypes([]);
			setCharacterOverviewBackground(false);
		}

		async function getStory() {
			const story_response = await APIRequest("/story?uid=" + story_uid, "GET");
			if (!story_response?.data?.story || story_response?.error || story_response?.data?.story?.uid !== story_uid) {
				setStateToDefault();
				return false;
			}
			setStory(story_response.data.story);
			setIsAuthorizedToEdit(story_response?.data?.isAuthorizedToEdit);
			return story_response.data.story;
		}

		async function getStoryIcon(iconID) {
			if (!iconID) return setStoryIcon(false);
			const response = await APIRequest("/image/" + iconID, "GET");
			if (response?.error || !response?.data?.image) return setStoryIcon(false);

			setStoryIcon(response.data.image);
			return response.data.image;
		}

		async function getCharacter(story_id) {
			if (!story_id) return;
			const character_response = await APIRequest("/character?uid=" + character_uid + "&story_id=" + story_id, "GET");
			if (!character_response?.data?.character || character_response?.error || character_response?.data?.character?.uid !== character_uid) {
				setStateToDefault();
				setFailure(true);
				return false;
			}
			setCharacter(character_response.data.character);
			return character_response.data.character;
		}

		async function getCharacterTypes(characterTypesIDs) {
			if (!characterTypesIDs) return;
			let newCharacterTypes = await Promise.all(
				characterTypesIDs.map(async (characterTypeID) => {
					const character_type_response = await APIRequest("/character-type/" + characterTypeID, "GET");
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

		async function getCharacterOverviewBackground(overviewBackgroundID) {
			if (!overviewBackgroundID) return;
			const overview_background_image_response = await APIRequest("/image/" + overviewBackgroundID, "GET");
			if (overview_background_image_response?.errors || !overview_background_image_response?.data?.image) return false;

			setCharacterOverviewBackground(overview_background_image_response.data.image);
			return overview_background_image_response.data.image;
		}

		async function getCharacterCardBackground(cardBackgroundID) {
			if (!cardBackgroundID) return;
			const card_background_image_response = await APIRequest("/image/" + cardBackgroundID, "GET");
			if (card_background_image_response?.errors || !card_background_image_response?.data?.image) return false;

			setCharacterCardBackground(card_background_image_response.data.image);
			return card_background_image_response.data.image;
		}

		async function getCharacterGalleryImages(versions) {
			let imageIDs = [];
			versions.forEach((version) => {
				imageIDs = imageIDs.concat(version.gallery.filter((imageID) => imageIDs.indexOf(imageID) === -1));
			});

			let newGalleryImages = await Promise.all(
				imageIDs.map(async (imageID) => {
					const image_response = await APIRequest("/image/" + imageID, "GET");
					if (image_response?.errors || !image_response?.data?.image) return false;
					return image_response.data;
				})
			);
			newGalleryImages = newGalleryImages.filter((e) => e !== false);

			setCharacterGalleryImages(newGalleryImages);
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
		setCharacterOverviewBackground,
		setCharacterCardBackground,
		setCharacterGalleryImages,
		changeAccentColour,
		changeAccentHoverColour,
	]);

	function decrementCharacterVersion() {
		if (!character?.data?.version) return;
		const currentVersionIndex = character.data.version.findIndex((e) => e._id === characterVersion._id);
		if (currentVersionIndex === -1 || currentVersionIndex === 0) return;
		setCharacterVersion(character.data.version[currentVersionIndex - 1]);
	}

	function incrementCharacterVersion() {
		if (!character?.data?.version) return;
		const currentVersionIndex = character.data.version.findIndex((e) => e._id === characterVersion._id);
		if (currentVersionIndex === -1 || currentVersionIndex === character.data.version.length - 1) return;
		setCharacterVersion(character?.data?.version[currentVersionIndex + 1]);
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
				characterGalleryImages,
				setCharacterGalleryImages,
				characterVersion,
				setCharacterVersion,
				decrementCharacterVersion,
				incrementCharacterVersion,
				isOnOverviewSection,
				setIsOnOverviewSection,
				subpages,
				openSubpageID,
				setOpenSubpageID,
			}}
		>
			{children}
		</CharacterContext.Provider>
	);
};

export default CharacterProvider;
