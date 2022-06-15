// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const PsychologyItemsLogic = () => {
	const { isAuthorizedToEdit, story, character, characterVersion, changeCharacterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	const [isReorderingPsychologyItems, setIsReorderingPsychologyItems] = useState(false);
	function toggleIsReorderingPsychologyItems() {
		setIsReorderingPsychologyItems((oldIsReorderingPsychologyItems) => !oldIsReorderingPsychologyItems);
	}

	function changePsychologyItemTitle(e, index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.psychology.items[index].title = e.target.value;
		changeCharacterVersion(newCharacterVersion);
	}

	function changePsychologyItemValue(e, index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.psychology.items[index].value = e.target.value.split("\n");
		changeCharacterVersion(newCharacterVersion);
	}

	function addPsychologyItem() {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.psychology.items.push({ title: "", value: [""] });
		changeCharacterVersion(newCharacterVersion);
	}

	function removePsychologyItem(index) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.psychology.items.splice(index, 1);
		changeCharacterVersion(newCharacterVersion);
	}

	function reorderPsychologyItems(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const tempPsychologyItem = newCharacterVersion.psychology.items.splice(res.from, 1)[0];
		newCharacterVersion.psychology.items.splice(res.to, 0, tempPsychologyItem);
		changeCharacterVersion(newCharacterVersion);
	}

	const [errors, setErrors] = useState([]);

	async function revertPsychologyItems() {
		setErrors([]);
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "psychology", "items"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.psychology.items = response.data.value;
		changeCharacterVersion(newCharacterVersion);

		return true;
	}

	async function savePsychologyItems() {
		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "psychology", "items"],
			newValue: characterVersion.psychology.items,
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
		changePsychologyItemTitle,
		changePsychologyItemValue,
		addPsychologyItem,
		removePsychologyItem,
		isReorderingPsychologyItems,
		toggleIsReorderingPsychologyItems,
		reorderPsychologyItems,
		revertPsychologyItems,
		savePsychologyItems,
		errors,
	};
};
