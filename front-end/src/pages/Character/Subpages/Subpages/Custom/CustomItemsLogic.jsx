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

export const CustomItemsLogic = () => {
	const { isAuthorizedToEdit, story, character, setCharacter, openSubpageID } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function changeCustomItemTitle(e, index) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const customSubpageIndex = newCharacter.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newCharacter.data.custom_subpages[customSubpageIndex].items[index].title = e.target.value;
			return newCharacter;
		});
	}

	function changeCustomItemText(e, index) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const customSubpageIndex = newCharacter.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newCharacter.data.custom_subpages[customSubpageIndex].items[index].text = e.target.value.split("\n");
			return newCharacter;
		});
	}

	function addCustomItem() {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const customSubpageIndex = newCharacter.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newCharacter.data.custom_subpages[customSubpageIndex].items.push({ title: "", text: [""], images: [] });
			return newCharacter;
		});
	}

	function removeCustomItem(index) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const customSubpageIndex = newCharacter.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newCharacter.data.custom_subpages[customSubpageIndex].items.splice(index, 1);
			return newCharacter;
		});
	}

	const [isReorderingCustomItems, setIsReorderingCustomItems] = useState(false);
	function toggleIsReorderingCustomItems() {
		setIsReorderingCustomItems((oldIsReorderingCustomItems) => !oldIsReorderingCustomItems);
	}

	function reorderCustomItems(res) {
		if (res?.from === undefined || res?.to === undefined) return false;
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const customSubpageIndex = newCharacter.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			const tempCustomItem = newCharacter.data.custom_subpages[customSubpageIndex].items.splice(res.from, 1)[0];
			newCharacter.data.custom_subpages[openSubpageID].items.splice(res.to, 0, tempCustomItem);
			return newCharacter;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertCustomItems() {
		setErrors([]);
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "custom_subpages", openSubpageID, "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			const customSubpageIndex = newCharacter.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
			newCharacter.data.custom_subpages[customSubpageIndex].items = response.data.value;
			return newCharacter;
		});

		return true;
	}

	async function saveCustomItems() {
		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "custom_subpages", openSubpageID, "items"],
			newValue: character.data.custom_subpages.find((e) => e.id === openSubpageID).items,
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
		const customSubpageIndex = newCharacter.data.custom_subpages.findIndex((e) => e.id === openSubpageID);
		if (
			newCharacter.data.custom_subpages[customSubpageIndex].items[newCharacterImagesCurrDevItemIndex].images.findIndex(
				(e) => e.image === image_id
			) !== -1
		)
			return false;
		newCharacter.data.custom_subpages[customSubpageIndex].items[newCharacterImagesCurrDevItemIndex].images.push({
			image: image_id,
			caption: "",
		});
		setCharacter(newCharacter);
	}

	const customItemsRef = useRef();
	function onCustomItemsContainerScroll(e) {
		if (customItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		character,
		openSubpageID,
		changeCustomItemTitle,
		changeCustomItemText,
		addCustomItem,
		removeCustomItem,
		isReorderingCustomItems,
		toggleIsReorderingCustomItems,
		reorderCustomItems,
		revertCustomItems,
		saveCustomItems,
		errors,
		characterImagesCurrDevItemIndex,
		openCharacterImages,
		closeCharacterImages,
		addImageToDevItem,
		customItemsRef,
		onCustomItemsContainerScroll,
	};
};
