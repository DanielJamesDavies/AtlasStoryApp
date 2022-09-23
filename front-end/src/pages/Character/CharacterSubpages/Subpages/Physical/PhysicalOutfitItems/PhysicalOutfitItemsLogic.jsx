// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const PhysicalOutfitItemsLogic = () => {
	const { isAuthorizedToEdit, story, character, characterVersion, changeCharacterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function changePhysicalOutfitItemTitle(e, index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.physical.outfits[index].title = e.target.value;
		changeCharacterVersion(newCharacterVersion);
	}

	function changePhysicalOutfitItemText(e, index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.physical.outfits[index].text = e.target.value.split("\n");
		changeCharacterVersion(newCharacterVersion);
	}

	function changePhysicalOutfitItemImageCaption(e, index, imageIndex) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.physical.outfits[index].images[imageIndex].caption = e.target.value;
		changeCharacterVersion(newCharacterVersion);
	}

	function removePhysicalOutfitItemImage(index, imageIndex) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.physical.outfits[index].images.splice(imageIndex, 1);
		changeCharacterVersion(newCharacterVersion);
	}

	function addPhysicalOutfitItem() {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.physical.outfits.push({ title: "", text: [""], images: [] });
		changeCharacterVersion(newCharacterVersion);
	}

	function removePhysicalOutfitItem(index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.physical.outfits.splice(index, 1);
		changeCharacterVersion(newCharacterVersion);
	}

	const [isReorderingPhysicalOutfitItems, setIsReorderingPhysicalOutfitItems] = useState(false);
	function toggleIsReorderingPhysicalOutfitItems() {
		setIsReorderingPhysicalOutfitItems((oldIsReorderingPhysicalOutfitItems) => !oldIsReorderingPhysicalOutfitItems);
	}

	function reorderPhysicalOutfitItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const tempPhysicalOutfitItem = newCharacterVersion.physical.outfits.splice(res.from, 1)[0];
		newCharacterVersion.physical.outfits.splice(res.to, 0, tempPhysicalOutfitItem);
		changeCharacterVersion(newCharacterVersion);
	}

	function reorderPhysicalOutfitItemImages(res, index) {
		if (res.from === undefined || res.to === undefined) return false;
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const tempPhysicalAttributeItemImage = newCharacterVersion.physical.outfits[index].images.splice(res.from, 1)[0];
		newCharacterVersion.physical.outfits[index].images.splice(res.to, 0, tempPhysicalAttributeItemImage);
		changeCharacterVersion(newCharacterVersion);
	}

	const [errors, setErrors] = useState([]);

	async function revertPhysicalOutfitItems() {
		setErrors([]);
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "physical", "outfits"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.physical.outfits = response.data.value;
		changeCharacterVersion(newCharacterVersion);

		return true;
	}

	async function savePhysicalOutfitItems() {
		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "physical", "outfits"],
			newValue: characterVersion.physical.outfits,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	const physicalOutfitItemsRef = useRef();
	function onPhysicalOutfitItemsContainerScroll(e) {
		if (physicalOutfitItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		characterVersion,
		changePhysicalOutfitItemTitle,
		changePhysicalOutfitItemText,
		changePhysicalOutfitItemImageCaption,
		removePhysicalOutfitItemImage,
		addPhysicalOutfitItem,
		removePhysicalOutfitItem,
		isReorderingPhysicalOutfitItems,
		toggleIsReorderingPhysicalOutfitItems,
		reorderPhysicalOutfitItems,
		reorderPhysicalOutfitItemImages,
		revertPhysicalOutfitItems,
		savePhysicalOutfitItems,
		errors,
		physicalOutfitItemsRef,
		onPhysicalOutfitItemsContainerScroll,
	};
};
