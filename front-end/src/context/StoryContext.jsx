import React, { createContext, useContext, useRef, useState, useEffect } from "react";

import { AppContext } from "./AppContext";
import { APIContext } from "./APIContext";
import { RecentDataContext } from "./RecentDataContext";
import { RoutesContext } from "./RoutesContext";

export const StoryContext = createContext();

const StoryProvider = ({ children }) => {
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const { location } = useContext(RoutesContext);

	const curr_story_uid = useRef(false);
	const curr_location = useRef(false);

	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);
	const [isFollowingStory, setIsFollowingStory] = useState(false);
	const [story, setStory] = useState(false);
	const [storyIcon, setStoryIcon] = useState(false);
	const [storyBanner, setStoryBanner] = useState(false);
	const [storyMembers, setStoryMembers] = useState([]);
	const [storyNotesImages, setStoryNotesImages] = useState([]);
	const [storyGroups, setStoryGroups] = useState([]);
	const [storyCharacters, setStoryCharacters] = useState([]);
	const [storyCharacterRelationships, setStoryCharacterRelationships] = useState([]);
	const [storyCharacterTypes, setStoryCharacterTypes] = useState([]);
	const [storySubstories, setStorySubstories] = useState([]);

	useEffect(() => {
		async function getAll() {
			if (window !== window.parent) return;

			const story_uid = getStoryUID();
			if (!story_uid) return setStateToDefault();
			if (curr_story_uid.current === story_uid && curr_location.current === location) return;
			if (curr_story_uid.current !== story_uid) setStateToDefault();
			curr_story_uid.current = story_uid;
			curr_location.current = location;

			const newStory = await getStory(story_uid);
			if (!newStory) return;

			changeAccentColour(newStory?.data?.colours?.accent);
			changeAccentHoverColour(newStory?.data?.colours?.accentHover);

			getStoryMembers(newStory?.data?.members);
			getStoryIcon(newStory?.data?.icon);
			getStoryBanner(newStory?.data?.banner);
			getStoryNotesImages(newStory?.data?.notes);

			getStoryGroups(newStory.uid, newStory?.data?.groups);
			getStoryCharacterRelationships(newStory._id);
			getStoryCharacterTypes(newStory.uid, newStory?.data?.characterTypes);

			getStorySubstories(newStory.uid, newStory?.data?.substories);
		}

		function setStateToDefault() {
			curr_story_uid.current = false;
			setIsAuthorizedToEdit(false);
			setIsFollowingStory(false);
			setStory(false);
			setStoryIcon(false);
			setStoryBanner(false);
			setStoryMembers([]);
			setStoryGroups([]);
			setStoryCharacters([]);
			setStoryCharacterRelationships([]);
			setStoryCharacterTypes([]);
			setStorySubstories([]);
		}

		function getStoryUID() {
			const locationSplit = location.split("/");
			if (locationSplit.length < 3 || locationSplit[1] !== "s") return false;
			return locationSplit[2];
		}

		async function getStory(story_uid) {
			const response = await APIRequest("/story?uid=" + story_uid + "&story_uid=" + story_uid, "GET");
			if (!response?.data?.story || response?.error || story_uid !== response?.data?.story?.uid) {
				setStateToDefault();
				return false;
			}
			curr_story_uid.current = response?.data?.story?.uid;
			let newStory = JSON.parse(JSON.stringify(response.data.story));
			newStory.data.notes = newStory.data.notes.concat(
				[
					{ uid: "all", items: [] },
					{ uid: "characters", items: [] },
					{ uid: "substories", items: [] },
					{ uid: "world", items: [] },
				].filter((e) => newStory.data.notes.findIndex((e2) => e2.uid === e.uid) === -1)
			);
			setStory(newStory);
			setIsAuthorizedToEdit(response?.data?.isAuthorizedToEdit);
			setIsFollowingStory(response?.data?.isFollowingStory);
			return response.data.story;
		}

		async function getStoryMembers(members) {
			if (!members) return;
			let newStoryMembers = await Promise.all(members.map(async (member) => await getStoryMember(member)));
			newStoryMembers = newStoryMembers.filter((e) => e !== false);
			setStoryMembers(newStoryMembers);
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

		async function getStoryBanner(bannerID) {
			if (!bannerID) return;

			let banner = false;
			const recentImage = recentImages.current.find((e) => e?._id === bannerID);
			if (recentImage) {
				banner = recentImage;
			} else {
				const response = await APIRequest("/image/" + bannerID, "GET");
				if (response?.error || !response?.data?.image?.image) return setStoryBanner(false);
				banner = response?.data?.image;
			}

			addImagesToRecentImages([banner]);

			setStoryBanner(banner.image);
		}

		async function getStoryGroups(story_uid, groupIDs) {
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
			setStoryGroups(newGroups);
			getStoryCharacters(story_uid, newGroups);
			return newGroups;
		}

		async function getStoryCharacters(story_uid, newGroups) {
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

							let newCharacter = JSON.parse(JSON.stringify(character_response.data.character));

							const characterCardBackground = await getCharacterCardBackground(
								character_response.data.character?.data?.cardBackground
							);
							if (characterCardBackground) newCharacter.data.cardBackground = characterCardBackground;

							const characterFaceImage = await getCharacterFaceImage(character_response.data.character?.data?.faceImage);
							if (characterFaceImage) newCharacter.data.faceImage = characterFaceImage;

							return newCharacter;
						})
					);
					return characters.filter((e) => e !== false);
				})
			);
			newCharacters = newCharacters.flat(1);
			newCharacters = newCharacters.filter((e) => e !== false);
			setStoryCharacters(newCharacters);
			return newCharacters;
		}

		async function getCharacterCardBackground(cardBackgroundId) {
			if (!cardBackgroundId) return;

			const recentImage = recentImages.current.find((e) => e?._id === cardBackgroundId);
			if (recentImage) return recentImage;

			const card_background_image_response = await APIRequest("/image/" + cardBackgroundId, "GET");
			if (card_background_image_response?.errors || !card_background_image_response?.data?.image?.image) return false;
			return card_background_image_response.data.image;
		}

		async function getCharacterFaceImage(faceImageId) {
			if (!faceImageId) return;

			const recentImage = recentImages.current.find((e) => e?._id === faceImageId);
			if (recentImage) return recentImage;

			const face_image_response = await APIRequest("/image/" + faceImageId, "GET");
			if (face_image_response?.errors || !face_image_response?.data?.image?.image) return false;
			return face_image_response.data.image;
		}

		async function getStoryCharacterRelationships(story_id) {
			if (!story_id) return false;

			let character_relationships_response = await APIRequest("/character-relationship?story_id=" + story_id, "GET");
			if (
				!character_relationships_response ||
				character_relationships_response?.errors ||
				!character_relationships_response?.data?.characterRelationships
			)
				return false;

			setStoryCharacterRelationships(character_relationships_response.data.characterRelationships);
			return character_relationships_response.data.characterRelationships;
		}

		async function getStoryCharacterTypes(story_uid, characterTypesIDs) {
			if (!characterTypesIDs) return;
			let newCharacterTypes = await Promise.all(
				characterTypesIDs.map(async (characterTypeID) => {
					const character_type_response = await APIRequest("/character-type/" + characterTypeID + "?story_uid=" + story_uid, "GET");
					if (character_type_response?.errors || !character_type_response?.data?.characterType) return false;
					return character_type_response.data.characterType;
				})
			);
			newCharacterTypes = newCharacterTypes.filter((e) => e !== false);

			setStoryCharacterTypes(newCharacterTypes);
			return newCharacterTypes;
		}

		async function getStorySubstories(story_uid, substoryIDs) {
			let newSubstories = await Promise.all(
				substoryIDs.map(async (substoryID) => {
					if (!substoryID) return false;
					const substory_response = await APIRequest("/substory/" + substoryID + "?story_uid=" + story_uid, "GET");
					if (substory_response?.errors || !substory_response?.data?.substory) return false;

					let newSubstory = JSON.parse(JSON.stringify(substory_response.data.substory));

					const posterBackground = await getStorySubstoryPoster(newSubstory?.data?.posterBackground);
					if (posterBackground) newSubstory.data.posterBackground = posterBackground;

					return newSubstory;
				})
			);
			newSubstories = newSubstories.filter((e) => e !== false);

			setStorySubstories(newSubstories);
		}

		async function getStorySubstoryPoster(posterBackgroundId) {
			if (!posterBackgroundId) return false;

			const recentImage = recentImages.current.find((e) => e?._id === posterBackgroundId);
			if (recentImage) return recentImage;

			const poster_background_image_response = await APIRequest("/image/" + posterBackgroundId, "GET");
			if (poster_background_image_response?.errors || !poster_background_image_response?.data?.image?.image) return false;
			return poster_background_image_response.data.image;
		}

		async function getStoryNotesImages(notes) {
			if (!notes) return setStoryNotesImages([]);
			let newStoryNotesImages = [];
			await Promise.all(
				notes.map(async (note) => {
					await Promise.all(
						note.items.map(async (item) => {
							await Promise.all(
								item?.images?.map(async (image) => {
									const image_response = await APIRequest("/image/" + image?.image, "GET");
									if (image_response?.errors || !image_response?.data?.image?.image) return false;
									newStoryNotesImages.push(image_response.data.image);
									return true;
								})
							);
							return true;
						})
					);
				})
			);
			setStoryNotesImages(newStoryNotesImages);
		}

		getAll();
	}, [
		curr_story_uid,
		APIRequest,
		location,
		recentImages,
		addImagesToRecentImages,
		changeAccentColour,
		changeAccentHoverColour,
		setIsAuthorizedToEdit,
		setIsFollowingStory,
		story,
		setStory,
		setStoryMembers,
		setStoryIcon,
		setStoryBanner,
		setStoryGroups,
		setStoryCharacters,
		setStoryCharacterRelationships,
		setStoryCharacterTypes,
		setStorySubstories,
	]);

	const [isDisplayingSettings, setIsDisplayingSettings] = useState(false);

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
				isAuthorizedToEdit,
				setIsAuthorizedToEdit,
				isFollowingStory,
				setIsFollowingStory,
				story,
				setStory,
				storyIcon,
				setStoryIcon,
				storyBanner,
				setStoryBanner,
				storyMembers,
				setStoryMembers,
				storyNotesImages,
				setStoryNotesImages,
				storyGroups,
				setStoryGroups,
				storyCharacters,
				setStoryCharacters,
				storyCharacterRelationships,
				setStoryCharacterRelationships,
				storyCharacterTypes,
				setStoryCharacterTypes,
				storySubstories,
				setStorySubstories,
				isDisplayingSettings,
				setIsDisplayingSettings,
				isReorderingCharacters,
				toggleIsReorderingCharacters,
				updateStoryColours,
			}}
		>
			{children}
		</StoryContext.Provider>
	);
};

export default StoryProvider;
