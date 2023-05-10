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

export const MiscellaneousItemsLogic = () => {
	const { isAuthorizedToEdit, story, character, setCharacter } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function changeMiscellaneousItemTitle(e, index) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.miscellaneous.items[index].title = e.target.value;
			return newCharacter;
		});
	}

	function changeMiscellaneousItemText(e, index) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.miscellaneous.items[index].text = e.target.value.split("\n");
			return newCharacter;
		});
	}

	function addMiscellaneousItem() {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.miscellaneous.items.push({ title: "", text: [""], images: [] });
			return newCharacter;
		});
	}

	function removeMiscellaneousItem(index) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.miscellaneous.items.splice(index, 1);
			return newCharacter;
		});
	}

	const [isReorderingMiscellaneousItems, setIsReorderingMiscellaneousItems] = useState(false);
	function toggleIsReorderingMiscellaneousItems() {
		setIsReorderingMiscellaneousItems((oldIsReorderingMiscellaneousItems) => !oldIsReorderingMiscellaneousItems);
	}

	function reorderMiscellaneousItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const tempMiscellaneousItem = newCharacter.data.miscellaneous.items.splice(res.from, 1)[0];
			newCharacter.data.miscellaneous.items.splice(res.to, 0, tempMiscellaneousItem);
			return newCharacter;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertMiscellaneousItems() {
		setErrors([]);
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "miscellaneous", "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.miscellaneous.items = response.data.value;
			return newCharacter;
		});

		return true;
	}

	async function saveMiscellaneousItems() {
		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "miscellaneous", "items"],
			newValue: character.data.miscellaneous.items,
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
		if (newCharacter.data.miscellaneous.items[newCharacterImagesCurrDevItemIndex].images.findIndex((e) => e.image === image_id) !== -1)
			return false;
		newCharacter.data.miscellaneous.items[newCharacterImagesCurrDevItemIndex].images.push({ image: image_id, caption: "" });
		setCharacter(newCharacter);
	}

	const miscellaneousItemsRef = useRef();
	function onMiscellaneousItemsContainerScroll(e) {
		if (miscellaneousItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		character,
		changeMiscellaneousItemTitle,
		changeMiscellaneousItemText,
		addMiscellaneousItem,
		removeMiscellaneousItem,
		isReorderingMiscellaneousItems,
		toggleIsReorderingMiscellaneousItems,
		reorderMiscellaneousItems,
		revertMiscellaneousItems,
		saveMiscellaneousItems,
		errors,
		characterImagesCurrDevItemIndex,
		openCharacterImages,
		closeCharacterImages,
		addImageToDevItem,
		miscellaneousItemsRef,
		onMiscellaneousItemsContainerScroll,
	};
};
