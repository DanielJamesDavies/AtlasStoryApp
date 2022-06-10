import React, { createContext, useState, useContext, useEffect } from "react";

import { AppContext } from "../../context/AppContext";
import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

export const CharacterContext = createContext();

const CharacterProvider = ({ children, story_url, character_url }) => {
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);

	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);

	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);

	const [character, setCharacter] = useState(false);

	const [characterTypes, setCharacterTypes] = useState([]);

	const [characterOverviewBackground, setCharacterOverviewBackground] = useState(false);
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
			if (!story_url || !character_url) {
				setStateToDefault();
				return;
			}
			if (story.url === story_url && character.url === character_url) return;

			let newStory = await getStory();
			if (!newStory) return;

			changeAccentColour(newStory?.data?.colours?.accent);
			changeAccentHoverColour(newStory?.data?.colours?.accentHover);

			getStoryIcon(newStory?.data?.icon);
			getCharacterTypes(newStory?.data?.characterTypes);

			let newCharacter = await getCharacter();
			if (!newCharacter) return;

			getCharacterOverviewBackground(newCharacter?.data?.overviewBackground);
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
			const story_response = await APIRequest("/story?url=" + story_url, "GET");
			if (!story_response?.data?.story || story_response?.error || story_response?.data?.story?.url !== story_url) {
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

		async function getCharacter() {
			const character_response = await APIRequest("/character?url=" + character_url, "GET");
			if (!character_response?.data?.character || character_response?.error || character_response?.data?.character?.url !== character_url) {
				setStateToDefault();
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

		async function getCharacterOverviewBackground(overviewBackgroundID) {
			if (!overviewBackgroundID) return;
			const overview_background_image_response = await APIRequest("/image/" + overviewBackgroundID, "GET");
			if (overview_background_image_response?.errors || !overview_background_image_response?.data?.image) return false;

			setCharacterOverviewBackground(overview_background_image_response.data.image);
			return overview_background_image_response.data.image;
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
		story_url,
		character_url,
		APIRequest,
		setIsAuthorizedToEdit,
		story,
		setStory,
		setStoryIcon,
		character,
		setCharacter,
		setCharacterTypes,
		setCharacterOverviewBackground,
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
				story_url,
				character_url,
				isAuthorizedToEdit,
				story,
				setStory,
				storyIcon,
				character,
				setCharacter,
				characterTypes,
				setCharacterTypes,
				characterOverviewBackground,
				setCharacterOverviewBackground,
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
