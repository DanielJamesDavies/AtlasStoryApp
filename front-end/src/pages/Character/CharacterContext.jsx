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

			let newCharacter = await getCharacter();
			if (!newCharacter) return;

			await getCharacterOverviewBackground(newCharacter?.data?.overviewBackground);

			await getCharacterTypes(newStory?.data?.characterTypes);
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

		async function getCharacterOverviewBackground(overviewBackgroundID) {
			if (!overviewBackgroundID) return;
			const overview_background_image_response = await APIRequest("/image/" + overviewBackgroundID, "GET");
			if (overview_background_image_response?.errors || !overview_background_image_response?.data?.image) return false;

			setCharacterOverviewBackground(overview_background_image_response.data.image);
			return overview_background_image_response.data.image;
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
		changeAccentColour,
		changeAccentHoverColour,
	]);

	return (
		<CharacterContext.Provider
			value={{
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
