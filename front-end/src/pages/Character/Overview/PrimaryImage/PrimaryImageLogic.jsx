// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../CharacterContext";
import { APIContext } from "../../../../context/APIContext";
import { LightboxContext } from "../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const CharacterOverviewPrimaryImageLogic = () => {
	const { isAuthorizedToEdit, story, character, characterVersion, characterPrimaryImages, setCharacterPrimaryImages } =
		useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	function onPrimaryImageClick() {
		setLightboxImageIDs([characterVersion?.primaryImage]);
		setLightboxIndex(0);
	}

	async function changePrimaryImage(image) {
		let newCharacterPrimaryImages = JSON.parse(JSON.stringify(characterPrimaryImages));
		const newCharacterPrimaryImagesIndex = newCharacterPrimaryImages.findIndex(
			(e) => JSON.stringify(e._id) === JSON.stringify(characterVersion._id)
		);
		if (newCharacterPrimaryImagesIndex === -1) return false;
		if (newCharacterPrimaryImages[newCharacterPrimaryImagesIndex]?.image?.image)
			newCharacterPrimaryImages[newCharacterPrimaryImagesIndex].image.image = image;
		setCharacterPrimaryImages(newCharacterPrimaryImages);
	}

	async function revertPrimaryImage() {
		let newCharacterPrimaryImages = JSON.parse(JSON.stringify(characterPrimaryImages));
		const newCharacterPrimaryImagesIndex = newCharacterPrimaryImages.findIndex(
			(e) => JSON.stringify(e._id) === JSON.stringify(characterVersion._id)
		);
		if (newCharacterPrimaryImagesIndex === -1) return false;

		const response = await APIRequest("/image/" + characterVersion?.primaryImage, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		newCharacterPrimaryImages[newCharacterPrimaryImagesIndex].image = response.data.image;
		setCharacterPrimaryImages(newCharacterPrimaryImages);
		return true;
	}

	async function savePrimaryImage() {
		if (!characterVersion?.primaryImage || !characterPrimaryImages) return false;

		let newCharacterPrimaryImages = JSON.parse(JSON.stringify(characterPrimaryImages));
		const newCharacterPrimaryImagesIndex = newCharacterPrimaryImages.findIndex(
			(e) => JSON.stringify(e._id) === JSON.stringify(characterVersion._id)
		);
		if (newCharacterPrimaryImagesIndex === -1 || newCharacterPrimaryImages[newCharacterPrimaryImagesIndex]?.image?.image === "NO_IMAGE")
			return false;

		const character_response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "primaryImage"],
			newValue: characterVersion.primaryImage,
		});
		if (!character_response || character_response?.errors) return false;

		const response = await APIRequest("/image/" + characterVersion?.primaryImage, "PATCH", {
			newValue: newCharacterPrimaryImages[newCharacterPrimaryImagesIndex]?.image?.image,
			story_id: story._id,
			character_id: character._id,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		characterVersion,
		characterPrimaryImages,
		onPrimaryImageClick,
		changePrimaryImage,
		revertPrimaryImage,
		savePrimaryImage,
	};
};
