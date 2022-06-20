// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../CharacterContext";
import { APIContext } from "../../../../../context/APIContext";

// Services

// Styles

// Assets

export const GalleryLogic = () => {
	const { isAuthorizedToEdit, story, character, characterVersion, changeCharacterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function addImageToVersionGallery(image_id) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		if (newCharacterVersion.gallery.findIndex((e) => e.image === image_id) !== -1) return false;
		newCharacterVersion.gallery.push({ image: image_id, caption: "" });
		changeCharacterVersion(newCharacterVersion);
	}

	function removeGalleryItem(index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.gallery.splice(index, 1);
		changeCharacterVersion(newCharacterVersion);
	}

	const [isReorderingGalleryItems, setIsReorderingGalleryItems] = useState(false);
	function toggleIsReorderingGalleryItems() {
		setIsReorderingGalleryItems((oldIsReorderingGalleryItems) => !oldIsReorderingGalleryItems);
	}

	function reorderGalleryItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const tempPsychologyItem = newCharacterVersion.gallery.splice(res.from, 1)[0];
		newCharacterVersion.gallery.splice(res.to, 0, tempPsychologyItem);
		changeCharacterVersion(newCharacterVersion);
	}

	const [errors, setErrors] = useState([]);

	async function revertGalleryItems() {
		setErrors([]);
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "gallery"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.gallery = response.data.value;
		changeCharacterVersion(newCharacterVersion);

		return true;
	}

	async function saveGalleryItems() {
		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "gallery"],
			newValue: characterVersion.gallery,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return {
		isAuthorizedToEdit,
		characterVersion,
		addImageToVersionGallery,
		removeGalleryItem,
		isReorderingGalleryItems,
		toggleIsReorderingGalleryItems,
		reorderGalleryItems,
		errors,
		revertGalleryItems,
		saveGalleryItems,
	};
};
