// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../CharacterContext";
import { APIContext } from "../../../../../context/APIContext";

// Services

// Styles

// Assets

export const DevelopmentItemsLogic = () => {
	const { isAuthorizedToEdit, story, character, setCharacter } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function changeDevelopmentItemTitle(e, index) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.development.items[index].title = e.target.value;
			return newCharacter;
		});
	}

	function changeDevelopmentItemValue(e, index) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.development.items[index].value = e.target.value.split("\n");
			return newCharacter;
		});
	}

	function addDevelopmentItem() {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.development.items.push({ title: "", value: [""], images: [] });
			return newCharacter;
		});
	}

	function removeDevelopmentItem(index) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.development.items.splice(index, 1);
			return newCharacter;
		});
	}

	const [isReorderingDevelopmentItems, setIsReorderingDevelopmentItems] = useState(false);
	function toggleIsReorderingDevelopmentItems() {
		setIsReorderingDevelopmentItems((oldIsReorderingDevelopmentItems) => !oldIsReorderingDevelopmentItems);
	}

	function reorderDevelopmentItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const tempDevelopmentItem = newCharacter.data.development.items.splice(res.from, 1)[0];
			newCharacter.data.development.items.splice(res.to, 0, tempDevelopmentItem);
			return newCharacter;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertDevelopmentItems() {
		setErrors([]);
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "development", "items"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.development.items = response.data.value;
			return newCharacter;
		});

		return true;
	}

	async function saveDevelopmentItems() {
		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "development", "items"],
			newValue: character.data.development.items,
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
		let newCharacter = JSON.parse(JSON.stringify(character));
		if (newCharacter.data.development.items[newCharacterImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1)
			return false;
		newCharacter.data.development.items[newCharacterImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setCharacter(newCharacter);
	}

	const developmentItemsRef = useRef();
	function onDevelopmentItemsContainerScroll(e) {
		if (developmentItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		character,
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
		developmentItemsRef,
		onDevelopmentItemsContainerScroll,
	};
};
