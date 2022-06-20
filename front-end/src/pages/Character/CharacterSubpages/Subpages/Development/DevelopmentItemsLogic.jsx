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

export const DevelopmentItemsLogic = () => {
	const { isAuthorizedToEdit, story, character, characterVersion, changeCharacterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function changeDevelopmentItemTitle(e, index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.development.items[index].title = e.target.value;
		changeCharacterVersion(newCharacterVersion);
	}

	function changeDevelopmentItemValue(e, index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.development.items[index].value = e.target.value.split("\n");
		changeCharacterVersion(newCharacterVersion);
	}

	function addDevelopmentItem() {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.development.items.push({ title: "", value: [""], images: [] });
		changeCharacterVersion(newCharacterVersion);
	}

	function removeDevelopmentItem(index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.development.items.splice(index, 1);
		changeCharacterVersion(newCharacterVersion);
	}

	const [isReorderingDevelopmentItems, setIsReorderingDevelopmentItems] = useState(false);
	function toggleIsReorderingDevelopmentItems() {
		setIsReorderingDevelopmentItems((oldIsReorderingDevelopmentItems) => !oldIsReorderingDevelopmentItems);
	}

	function reorderDevelopmentItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const tempDevelopmentItem = newCharacterVersion.development.items.splice(res.from, 1)[0];
		newCharacterVersion.development.items.splice(res.to, 0, tempDevelopmentItem);
		changeCharacterVersion(newCharacterVersion);
	}

	const [errors, setErrors] = useState([]);

	async function revertDevelopmentItems() {
		setErrors([]);
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "development", "items"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.development.items = response.data.value;
		changeCharacterVersion(newCharacterVersion);

		return true;
	}

	async function saveDevelopmentItems() {
		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "development", "items"],
			newValue: characterVersion.development.items,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	const [characterImagesCurrDevItemIndex, setCharacterImagesCurrDevItemIndex] = useState(-1);
	function openCharacterImages(index) {
		setCharacterImagesCurrDevItemIndex(index);
	}

	function closeCharacterImages() {
		setCharacterImagesCurrDevItemIndex(-1);
	}

	function addImageToDevItem(image_id) {
		const newCharacterImagesCurrDevItemIndex = JSON.parse(JSON.stringify(characterImagesCurrDevItemIndex));
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		if (newCharacterVersion.development.items[newCharacterImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1)
			return false;
		newCharacterVersion.development.items[newCharacterImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		changeCharacterVersion(newCharacterVersion);
	}

	return {
		isAuthorizedToEdit,
		characterVersion,
		changeDevelopmentItemTitle,
		changeDevelopmentItemValue,
		addDevelopmentItem,
		removeDevelopmentItem,
		isReorderingDevelopmentItems,
		toggleIsReorderingDevelopmentItems,
		reorderDevelopmentItems,
		revertDevelopmentItems,
		saveDevelopmentItems,
		errors,
		characterImagesCurrDevItemIndex,
		openCharacterImages,
		closeCharacterImages,
		addImageToDevItem,
	};
};
