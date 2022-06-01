import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { AppContext } from "../../context/AppContext";
import { RoutesContext } from "../../context/RoutesContext";

export const StoryContext = createContext();

const StoryProvider = ({ children, story_url }) => {
	const [isAuthorizedToModify, setIsAuthorizedToModify] = useState(false);
	const [story, setStory] = useState(false);
	const [members, setMembers] = useState([]);
	const [icon, setIcon] = useState(false);
	const [banner, setBanner] = useState(false);
	const [primaryCharacters, setPrimaryCharacters] = useState([]);
	const [primaryCharactersCardBackgrounds, setPrimaryCharactersCardBackgrounds] = useState([]);
	const [characterTypes, setCharacterTypes] = useState([]);
	const { APIRequest } = useContext(APIContext);
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { location } = useContext(RoutesContext);

	useEffect(() => {
		async function getStory() {
			if (!story_url) return setStory(false);
			if (story.url === story_url) return;

			// Story Data
			const response = await APIRequest("/story?url=" + story_url, "GET");
			if (!response?.data?.story || response?.error || story_url !== response.data.story.url) {
				setStory(false);
				setIcon(false);
				setBanner(false);
				setIsAuthorizedToModify(false);
				return;
			}

			setStory(response.data.story);

			setIsAuthorizedToModify(response?.data?.isAuthorizedToModify);

			changeAccentColour(response?.data?.story?.data?.colours?.accent);
			changeAccentHoverColour(response?.data?.story?.data?.colours?.accentHover);

			getStoryMembers(response.data.story?.data?.members);
			getStoryIcon(response.data.story?.data?.icon);
			getStoryBanner(response.data.story?.data?.banner);
			getStoryPrimaryCharacters(response.data.story?.data?.primaryCharacters);
			getCharacterTypes(response?.data?.story?.data?.characterTypes);
		}

		async function getStoryMembers(members) {
			if (!members) return;
			let newStoryMembers = await Promise.all(members.map(async (member) => await getStoryMember(member)));
			newStoryMembers = newStoryMembers.filter((e) => e !== false);
			setMembers(newStoryMembers);
		}

		async function getStoryMember(member) {
			if (!member) return;
			const member_response = await APIRequest("/user/" + member.user_id, "GET");
			if (member_response?.error || !member_response?.data?.user) return false;
			return {
				_id: member_response?.data?.user?._id,
				username: member_response?.data?.user?.username,
				nickname: member_response?.data?.user?.data?.nickname,
				type: member.type,
			};
		}

		async function getStoryIcon(iconID) {
			if (!iconID) return;
			const response = await APIRequest("/image/" + iconID, "GET");
			if (response?.error || !response?.data?.image) return setIcon(false);
			setIcon(response.data.image);
		}

		async function getStoryBanner(bannerID) {
			if (!bannerID) return;
			const response = await APIRequest("/image/" + bannerID, "GET");
			if (response?.error || !response?.data?.image) return setBanner(false);
			setBanner(response.data.image);
		}

		async function getStoryPrimaryCharacters(primaryCharactersIDs) {
			if (!primaryCharactersIDs) return;
			let newPrimaryCharacters = await Promise.all(
				primaryCharactersIDs.map(async (characterID) => {
					const character_response = await APIRequest("/character/" + characterID, "GET");
					if (character_response?.errors || !character_response?.data?.character) return false;

					return character_response.data.character;
				})
			);
			newPrimaryCharacters = newPrimaryCharacters.filter((e) => e !== false);
			setPrimaryCharacters(newPrimaryCharacters);

			let newPrimaryCharactersCardBackgrounds = await Promise.all(
				newPrimaryCharacters.map(async (character) => {
					if (!character?.data?.cardBackground) return false;
					const card_background_response = await APIRequest("/image/" + character.data.cardBackground, "GET");
					if (card_background_response?.errors || !card_background_response?.data?.image) return false;

					return card_background_response.data;
				})
			);
			newPrimaryCharactersCardBackgrounds = newPrimaryCharactersCardBackgrounds.filter((e) => e !== false);
			setPrimaryCharactersCardBackgrounds(newPrimaryCharactersCardBackgrounds);
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
		}

		getStory();

		let reloadTimer = setTimeout(() => getStory(), 1);
		return () => {
			clearTimeout(reloadTimer);
		};
	}, [
		location,
		story_url,
		APIRequest,
		story,
		setStory,
		setMembers,
		setIcon,
		setBanner,
		setPrimaryCharacters,
		setIsAuthorizedToModify,
		changeAccentColour,
		changeAccentHoverColour,
	]);

	const [isReorderingCharacters, setIsReorderingCharacters] = useState(false);
	function toggleIsReorderingCharacters() {
		setIsReorderingCharacters((oldIsReorderingCharacters) => !oldIsReorderingCharacters);
	}

	return (
		<StoryContext.Provider
			value={{
				isAuthorizedToModify,
				story,
				setStory,
				members,
				icon,
				banner,
				primaryCharacters,
				setPrimaryCharacters,
				primaryCharactersCardBackgrounds,
				characterTypes,
				isReorderingCharacters,
				toggleIsReorderingCharacters,
			}}
		>
			{children}
		</StoryContext.Provider>
	);
};

export default StoryProvider;
