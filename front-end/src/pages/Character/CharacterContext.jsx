import React, { createContext, useState, useContext, useEffect, useMemo, useRef } from "react";

import { AppContext } from "../../context/AppContext";
import { APIContext } from "../../context/APIContext";
import { RecentDataContext } from "../../context/RecentDataContext";
import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";

export const CharacterContext = createContext();

const CharacterProvider = ({ children, story_uid, character_uid }) => {
	const { changeAccentColour, changeAccentHoverColour } = useContext(AppContext);
	const { APIRequest } = useContext(APIContext);
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const { location, locationParams, changeLocationParameters } = useContext(RoutesContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon, storyGroups, storyCharacters, storyCharacterTypes, storyCharacterRelationships } =
		useContext(StoryContext);

	const [failure, setFailure] = useState(false);

	const [character, setCharacter] = useState(false);

	const [characterPrimaryImages, setCharacterPrimaryImages] = useState([]);
	const [characterOverviewBackground, setCharacterOverviewBackground] = useState(false);
	const [characterOverviewForegrounds, setCharacterOverviewForegrounds] = useState([]);
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
			{ id: "physical", name: "Appearance", isEnabled: true },
			{ id: "psychology", name: "Personality", isEnabled: true },
			{ id: "biography", name: "Background", isEnabled: true },
			{ id: "abilities", name: "Abilities & Equipment", isEnabled: true },
			{ id: "relationships", name: "Relationships", isEnabled: true },
			{ id: "gallery", name: "Gallery", isEnabled: true },
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
			if (!story || story.uid !== story_uid) return;
			curr_story_uid.current = story?.uid;

			let newCharacter = await getCharacter(story._id);
			if (!newCharacter) return;

			// Document Title
			updateDocumentTitle(newCharacter);
			setTimeout(() => updateDocumentTitle(newCharacter), 1000);

			getCharacterSubpages(newCharacter?.data?.subpages, isAuthorizedToEdit);
			getCharacterPrimaryImages(newCharacter?.data?.versions);
			getCharacterOverviewBackground(newCharacter?.data?.overviewBackground);
			getCharacterOverviewForegrounds(newCharacter?.data?.versions);
			getCharacterCardBackground(newCharacter?.data?.cardBackground);
			getCharacterFaceImage(newCharacter?.data?.faceImage);
			getCharacterImages(newCharacter?.data?.images);

			if (newCharacter?.data?.versions[0]) setCharacterVersion(newCharacter.data.versions[0]);
		}

		function updateDocumentTitle(newCharacter) {
			if (newCharacter?.data?.name && story?.data?.title) {
				document.title = newCharacter?.data?.name + " | " + story?.data?.title + " | Character | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		function setStateToDefault() {
			setCharacter(false);
			setCharacterOverviewBackground(false);
			setCharacterCardBackground(false);
			setCharacterFaceImage(false);
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
			curr_character_uid.current = character_response.data.character?.uid;
			return character_response.data.character;
		}

		function getCharacterSubpages(characterSubpages, isAuthorizedToEdit) {
			let newSubpages = [];

			for (let i = 0; i < characterSubpages.length; i++) {
				let newSubpage = allSubpages.find((e) => e.id === characterSubpages[i].id);
				if (newSubpage) {
					newSubpage.isEnabled = characterSubpages[i]?.isEnabled;
					newSubpages.push(newSubpage);
				} else {
					newSubpages.push(characterSubpages[i]);
				}
			}
			newSubpages = newSubpages.concat(allSubpages.filter((e) => newSubpages.findIndex((e2) => e2.id === e.id) === -1));

			setSubpages(newSubpages);
			setOpenSubpageID((oldOpenSubpageID) => {
				if (oldOpenSubpageID !== false) return oldOpenSubpageID;
				return newSubpages.filter((e) => (isAuthorizedToEdit ? e?.isEnabled : e?.isEnabled && !["profile", "settings"].includes(e?.id)))[0]
					?.id;
			});
		}

		async function getCharacterPrimaryImages(versions) {
			if (!versions) return;

			const primaryImages = await Promise.all(
				versions.map(async (version) => {
					const recentImage = recentImages.current.find((e) => e?._id === version?.primaryImage);
					if (recentImage?.image) {
						return { _id: version._id, image: recentImage };
					} else {
						const primary_image_response = await APIRequest("/image/" + version?.primaryImage, "GET");
						if (primary_image_response?.errors || !primary_image_response?.data?.image?.image) {
							return { _id: version._id, image: { _id: version?.primaryImage, image: "NO_IMAGE" } };
						}
						addImagesToRecentImages([primary_image_response?.data?.image]);
						return { _id: version._id, image: primary_image_response?.data?.image };
					}
				})
			);

			setCharacterPrimaryImages(primaryImages);

			return primaryImages;
		}

		async function getCharacterOverviewBackground(overviewBackgroundID) {
			let currOverviewBackground = false;
			setCharacterOverviewBackground((oldCharacterOverviewBackground) => {
				currOverviewBackground = JSON.parse(JSON.stringify(oldCharacterOverviewBackground));
				return oldCharacterOverviewBackground;
			});
			if (!overviewBackgroundID || currOverviewBackground) return;

			let overviewBackground = false;

			const recentImage = recentImages.current.find((e) => e?._id === overviewBackgroundID);
			if (recentImage?.image) {
				overviewBackground = recentImage;
			} else {
				const overview_background_image_response = await APIRequest("/image/" + overviewBackgroundID, "GET");
				if (overview_background_image_response?.errors || !overview_background_image_response?.data?.image?.image) {
					setCharacterOverviewBackground("NO_IMAGE");
					return false;
				}
				overviewBackground = overview_background_image_response?.data?.image;
			}

			addImagesToRecentImages([overviewBackground]);

			setCharacterOverviewBackground(overviewBackground.image);
			return overviewBackground.image;
		}

		async function getCharacterOverviewForegrounds(versions) {
			if (!versions) return;

			const overviewForegrounds = await Promise.all(
				versions.map(async (version) => {
					const recentImage = recentImages.current.find((e) => e?._id === version?.overviewForeground?.image);
					if (recentImage?.image) {
						return { _id: version._id, image: recentImage };
					} else {
						const primary_image_response = await APIRequest("/image/" + version?.overviewForeground?.image, "GET");
						if (primary_image_response?.errors || !primary_image_response?.data?.image?.image) {
							return { _id: version._id, image: { _id: version?.overviewForeground?.image, image: "NO_IMAGE" } };
						}
						addImagesToRecentImages([primary_image_response?.data?.image]);
						return { _id: version._id, image: primary_image_response?.data?.image };
					}
				})
			);

			setCharacterOverviewForegrounds(overviewForegrounds);

			return overviewForegrounds;
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

		getInitial();
	}, [
		location,
		story_uid,
		character_uid,
		curr_story_uid,
		curr_character_uid,
		isAuthorizedToEdit,
		story,
		APIRequest,
		recentImages,
		addImagesToRecentImages,
		failure,
		setFailure,
		setStory,
		setCharacter,
		allSubpages,
		setSubpages,
		setOpenSubpageID,
		setCharacterPrimaryImages,
		setCharacterOverviewBackground,
		setCharacterCardBackground,
		setCharacterFaceImage,
		setCharacterImages,
		changeAccentColour,
		changeAccentHoverColour,
	]);

	const curr_character_relatioships_characters_character_uid = useRef(false);
	useEffect(() => {
		async function getCharacterRelationshipsCharacters() {
			if (storyCharacters.length === 0) return false;
			if (!character?._id) return false;
			if (curr_character_relatioships_characters_character_uid.current === character.uid) return false;
			curr_character_relatioships_characters_character_uid.current = character.uid;

			// let newCharacters = (
			// 	await Promise.all(
			// 		groups.map(async (group) => {
			// 			return await Promise.all(
			// 				group?.data?.characters?.map(async (group_character) => {
			// 					const character_response = await APIRequest(
			// 						"/character/" + group_character.character_id + "?card=true&story_id=" + story_id,
			// 						"GET"
			// 					);
			// 					if (character_response?.errors || !character_response?.data?.character) return false;
			// 					let newCharacter = JSON.parse(JSON.stringify(character_response.data.character));
			// 					if (newCharacter?.data?.faceImage) {
			// 						const recentImage = recentImages.current.find((e) => e?._id === newCharacter?.data?.faceImage);
			// 						if (recentImage) {
			// 							newCharacter.data.faceImage = recentImage;
			// 						} else {
			// 							const face_image_response = await APIRequest("/image/" + newCharacter.data.faceImage, "GET");
			// 							newCharacter.data.faceImage = face_image_response?.data?.image;
			// 						}
			// 					}
			// 					return newCharacter;
			// 				})
			// 			);
			// 		})
			// 	)
			// )
			// 	.flat(1)
			// 	.filter((e) => e !== false);

			const characterIndex = storyCharacters.findIndex((e) => e.uid === character.uid);
			const firstNewCharacterRelationshipsCharacters = JSON.parse(JSON.stringify(storyCharacters)).slice(characterIndex);
			const lastNewCharacterRelationshipsCharacters = JSON.parse(JSON.stringify(storyCharacters)).slice(0, characterIndex);
			const newCharacterRelationshipsCharacters = firstNewCharacterRelationshipsCharacters.concat(lastNewCharacterRelationshipsCharacters);

			setCharacterRelationshipsCharacters(newCharacterRelationshipsCharacters);
		}
		getCharacterRelationshipsCharacters();
	}, [storyCharacters, character]);

	const curr_character_relatioships_character_uid = useRef(false);
	useEffect(() => {
		async function getCharacterRelationships() {
			if (!character?._id) return false;
			if (curr_character_relatioships_character_uid.current === character.uid) return false;
			curr_character_relatioships_character_uid.current = character.uid;

			const newCharacterRelationships = storyCharacterRelationships.filter((e) => e.character_ids.includes(character._id));
			setCharacterRelationships(newCharacterRelationships);
			return newCharacterRelationships;
		}
		getCharacterRelationships();
	}, [setCharacterRelationships, storyCharacters, story, character, storyCharacterRelationships]);

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

	const hasReadInitialLocationParameters = useRef(false);

	useEffect(() => {
		if (character) {
			if (!hasReadInitialLocationParameters.current) {
				if (locationParams.current.findIndex((e) => e.label === "subpage") !== -1) {
					setIsOnOverviewSection(false);
					setOpenSubpageID(locationParams.current.find((e) => e.label === "subpage").value);
				}
				if (locationParams.current.findIndex((e) => e.label === "version") !== -1) {
					const characterVersionIndex = character.data.versions.findIndex(
						(e) => e._id === locationParams.current.find((e) => e.label === "version").value
					);
					if (characterVersionIndex !== -1) changeCharacterVersion(character.data.versions[characterVersionIndex]);
				}
				setTimeout(() => (hasReadInitialLocationParameters.current = true), 500);
			} else {
				let newLocationParameters = [];
				if (characterVersion?._id) newLocationParameters.push({ label: "version", value: characterVersion._id });
				if (!isOnOverviewSection) newLocationParameters.push({ label: "subpage", value: openSubpageID });
				changeLocationParameters(newLocationParameters);
			}
			if (character?.data?.name && story?.data?.title)
				setTimeout(() => (document.title = character?.data?.name + " | " + story?.data?.title + " | Character | Atlas Story App"), 100);
		}
	}, [
		changeLocationParameters,
		hasReadInitialLocationParameters,
		locationParams,
		isOnOverviewSection,
		openSubpageID,
		characterVersion,
		character,
		story,
	]);

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
				storyCharacterTypes,
				storyGroups,
				storyCharacters,
				characterPrimaryImages,
				setCharacterPrimaryImages,
				characterOverviewBackground,
				setCharacterOverviewBackground,
				characterOverviewForegrounds,
				setCharacterOverviewForegrounds,
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
