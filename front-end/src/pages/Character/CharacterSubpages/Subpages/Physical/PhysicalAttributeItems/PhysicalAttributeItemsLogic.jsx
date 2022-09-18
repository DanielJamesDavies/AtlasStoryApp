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

export const PhysicalAttributeItemsLogic = () => {
	const { isAuthorizedToEdit, story, character, characterVersion, changeCharacterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function changePhysicalAttributeItemTitle(e, index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.physical.attributes[index].title = e.target.value;
		changeCharacterVersion(newCharacterVersion);
	}

	function changePhysicalAttributeItemValue(e, index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.physical.attributes[index].value = e.target.value.split("\n");
		changeCharacterVersion(newCharacterVersion);
	}

	function addPhysicalAttributeItem() {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.physical.attributes.push({ title: "", value: [""] });
		changeCharacterVersion(newCharacterVersion);
	}

	function removePhysicalAttributeItem(index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.physical.attributes.splice(index, 1);
		changeCharacterVersion(newCharacterVersion);
	}

	function defaultPhysicalAttributeItems() {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const defaultPhysicalAttributeItemsTitles = [
			"Gender",
			"Hairstyle",
			"Facial Hair",
			"Hair Colour",
			"Eye Colour",
			"Voice Descriptives",
			"Height",
			"Build",
			"Ethnicity",
			"Skin Colour",
			"Scars",
		];
		let newPhysicalAttributeItems = defaultPhysicalAttributeItemsTitles.map((title) => {
			const correspondingItem = newCharacterVersion.physical.attributes.find((e) => e.title === title);
			if (correspondingItem) return correspondingItem;
			return { title, value: [""] };
		});
		newPhysicalAttributeItems = newPhysicalAttributeItems.concat(
			newCharacterVersion.physical.attributes.filter((e) => !defaultPhysicalAttributeItemsTitles.includes(e.title))
		);
		newCharacterVersion.physical.attributes = newPhysicalAttributeItems;
		changeCharacterVersion(newCharacterVersion);
	}

	const [isReorderingPhysicalAttributeItems, setIsReorderingPhysicalAttributeItems] = useState(false);
	function toggleIsReorderingPhysicalAttributeItems() {
		setIsReorderingPhysicalAttributeItems((oldIsReorderingPhysicalAttributeItems) => !oldIsReorderingPhysicalAttributeItems);
	}

	function reorderPhysicalAttributeItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const tempPhysicalAttributeItem = newCharacterVersion.physical.attributes.splice(res.from, 1)[0];
		newCharacterVersion.physical.attributes.splice(res.to, 0, tempPhysicalAttributeItem);
		changeCharacterVersion(newCharacterVersion);
	}

	const [errors, setErrors] = useState([]);

	async function revertPhysicalAttributeItems() {
		setErrors([]);
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "physical", "attributes"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.physical.attributes = response.data.value;
		changeCharacterVersion(newCharacterVersion);

		return true;
	}

	async function savePhysicalAttributeItems() {
		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "physical", "attributes"],
			newValue: characterVersion.physical.attributes,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	const physicalAttributeItemsRef = useRef();
	function onPhysicalAttributeItemsContainerScroll(e) {
		if (physicalAttributeItemsRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		characterVersion,
		changePhysicalAttributeItemTitle,
		changePhysicalAttributeItemValue,
		addPhysicalAttributeItem,
		removePhysicalAttributeItem,
		defaultPhysicalAttributeItems,
		isReorderingPhysicalAttributeItems,
		toggleIsReorderingPhysicalAttributeItems,
		reorderPhysicalAttributeItems,
		revertPhysicalAttributeItems,
		savePhysicalAttributeItems,
		errors,
		physicalAttributeItemsRef,
		onPhysicalAttributeItemsContainerScroll,
	};
};
