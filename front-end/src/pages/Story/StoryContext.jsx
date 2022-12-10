import React, { createContext, useState, useContext, useEffect, useRef } from "react";

import { AppContext } from "../../context/AppContext";
import { APIContext } from "../../context/APIContext";
import { RecentDataContext } from "../../context/RecentDataContext";
import { RoutesContext } from "../../context/RoutesContext";

export const StoryContext = createContext();

const StoryProvider = ({ children, story_uid }) => {
	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);
	const [isFollowingStory, setIsFollowingStory] = useState(false);
	const [story, setStory] = useState(false);
	const [members, setMembers] = useState([]);
	const [icon, setIcon] = useState(false);
	const [banner, setBanner] = useState(false);
	const [primaryCharacters, setPrimaryCharacters] = useState([]);
	const [primaryCharactersCardBackgrounds, setPrimaryCharactersCardBackgrounds] = useState(false);
	const [characterTypes, setCharacterTypes] = useState([]);
	const [isDisplayingSettings, setIsDisplayingSettings] = useState(false);
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const { location } = useContext(RoutesContext);

	const curr_story_uid = useRef(false);
	const isGetting = useRef({ storyIcon: false, storyBanner: false, primaryCharactersCardBackgrounds: false });
	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return setStateToDefault();
			if (curr_story_uid.current === story_uid) return;

			const newStory = await getStory();
			if (!newStory) return;

			changeAccentColour(newStory?.data?.colours?.accent);
			changeAccentHoverColour(newStory?.data?.colours?.accentHover);

			// Document Title
			if (newStory?.data?.title) {
				document.title = newStory?.data?.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}

			getStoryMembers(newStory?.data?.members);
			getStoryIcon(newStory?.data?.icon);
			getStoryBanner(newStory?.data?.banner);
			getStoryPrimaryCharacters(newStory?.data?.primaryCharacters);
			getCharacterTypes(newStory?.data?.characterTypes);
		}

		function setStateToDefault() {
			setIsAuthorizedToEdit(false);
			setIsFollowingStory(false);
			setStory(false);
			setIcon(false);
			setBanner(false);
			setPrimaryCharacters([]);
			setPrimaryCharactersCardBackgrounds(false);
			setCharacterTypes([]);
		}

		async function getStory() {
			const response = await APIRequest("/story?uid=" + story_uid + "&story_uid=" + story_uid, "GET");
			if (!response?.data?.story || response?.error || story_uid !== response?.data?.story?.uid) {
				setStateToDefault();
				return false;
			}
			curr_story_uid.current = response?.data?.story?.uid;
			setStory(response.data.story);
			setIsAuthorizedToEdit(response?.data?.isAuthorizedToEdit);
			setIsFollowingStory(response?.data?.isFollowingStory);
			return response.data.story;
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
			if (!iconID || isGetting.storyIcon) return;
			isGetting.storyIcon = true;

			let icon = false;
			const recentImage = recentImages.current.find((e) => e?._id === iconID);
			if (recentImage) {
				icon = recentImage;
			} else {
				const response = await APIRequest("/image/" + iconID, "GET");
				if (response?.error || !response?.data?.image?.image) return setIcon(false);
				icon = response?.data?.image;
			}

			addImagesToRecentImages([icon]);

			setIcon(icon.image);
		}

		async function getStoryBanner(bannerID) {
			if (!bannerID || isGetting.storyBanner) return;
			isGetting.storyBanner = true;

			let banner = false;
			const recentImage = recentImages.current.find((e) => e?._id === bannerID);
			if (recentImage) {
				banner = recentImage;
			} else {
				const response = await APIRequest("/image/" + bannerID, "GET");
				if (response?.error || !response?.data?.image?.image) return setBanner(false);
				banner = response?.data?.image;
			}

			addImagesToRecentImages([banner]);

			setBanner(banner.image);
		}

		async function getStoryPrimaryCharacters(primaryCharactersIDs) {
			if (!primaryCharactersIDs || isGetting.primaryCharactersCardBackgrounds) return;
			isGetting.primaryCharactersCardBackgrounds = true;

			let newPrimaryCharacters = await Promise.all(
				primaryCharactersIDs.map(async (characterID) => {
					if (!characterID) return false;
					const character_response = await APIRequest("/character/" + characterID + "?card=true&story_uid=" + story_uid, "GET");
					if (character_response?.errors || !character_response?.data?.character) return false;

					return character_response.data.character;
				})
			);
			newPrimaryCharacters = newPrimaryCharacters.filter((e) => e !== false);
			setPrimaryCharacters(newPrimaryCharacters);

			let newPrimaryCharactersCardBackgrounds = await Promise.all(
				newPrimaryCharacters.map(async (character) => {
					if (!character?.data?.cardBackground) return false;

					const recentImage = recentImages.current.find((e) => e?._id === character?.data?.cardBackground);
					if (recentImage) return recentImage;

					const card_background_response = await APIRequest("/image/" + character.data.cardBackground, "GET");
					if (card_background_response?.errors || !card_background_response?.data?.image?.image) return false;

					return card_background_response.data.image;
				})
			);
			newPrimaryCharactersCardBackgrounds = newPrimaryCharactersCardBackgrounds.filter((e) => e !== false);

			addImagesToRecentImages(newPrimaryCharactersCardBackgrounds);

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

		getInitial();
		let reloadTimer = setTimeout(() => getInitial(), 1);
		return () => clearTimeout(reloadTimer);
	}, [
		location,
		story_uid,
		APIRequest,
		recentImages,
		addImagesToRecentImages,
		curr_story_uid,
		isGetting,
		setStory,
		setMembers,
		setIcon,
		setBanner,
		setPrimaryCharacters,
		setIsAuthorizedToEdit,
		setIsFollowingStory,
		changeAccentColour,
		changeAccentHoverColour,
	]);

	const [isReorderingCharacters, setIsReorderingCharacters] = useState(false);
	function toggleIsReorderingCharacters() {
		setIsReorderingCharacters((oldIsReorderingCharacters) => !oldIsReorderingCharacters);
	}

	function updateStoryColours(newColours) {
		changeAccentColour(newColours?.accent);
		changeAccentHoverColour(newColours?.accentHover);
	}

	return (
		<StoryContext.Provider
			value={{
				story_uid,
				isAuthorizedToEdit,
				isFollowingStory,
				setIsFollowingStory,
				story,
				setStory,
				members,
				icon,
				setIcon,
				banner,
				setBanner,
				primaryCharacters,
				setPrimaryCharacters,
				primaryCharactersCardBackgrounds,
				characterTypes,
				isReorderingCharacters,
				toggleIsReorderingCharacters,
				isDisplayingSettings,
				setIsDisplayingSettings,
				updateStoryColours,
			}}
		>
			{children}
		</StoryContext.Provider>
	);
};

export default StoryProvider;
