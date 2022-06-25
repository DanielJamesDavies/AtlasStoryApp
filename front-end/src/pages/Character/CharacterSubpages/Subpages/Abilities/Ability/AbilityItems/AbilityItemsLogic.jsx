// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../../CharacterContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const AbilityItemsLogic = ({ ability, changeAbility }) => {
	const { isAuthorizedToEdit, story, character, characterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	async function addAbilityItem() {
		let newAbility = JSON.parse(JSON.stringify(ability));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newAbility.items.push({ _id: new_id_response.data._id, title: "", text: [""], images: [], statistics: { values: [], maxValue: 100 } });
		changeAbility(newAbility);
	}

	const [isReorderingAbilityItems, setIsReorderingAbilityItems] = useState(false);
	function toggleIsReorderingAbilityItems() {
		setIsReorderingAbilityItems((oldIsReorderingAbilityItems) => !oldIsReorderingAbilityItems);
	}

	function reorderAbilityItems(res) {
		if (res.from === undefined || res.to === undefined) return false;

		let newAbility = JSON.parse(JSON.stringify(ability));

		const tempAbilityItem = newAbility.items.splice(res.from, 1)[0];
		newAbility.items.splice(res.to, 0, tempAbilityItem);
		changeAbility(newAbility);
	}

	async function revertAbilityItems() {
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "abilities", ability._id, "items"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.items = response.data.value;
		changeAbility(newAbility);

		return true;
	}

	async function saveAbilityItems() {
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "abilities", ability._id, "items"],
			newValue: ability.items,
		});
		if (!response) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		addAbilityItem,
		isReorderingAbilityItems,
		toggleIsReorderingAbilityItems,
		reorderAbilityItems,
		revertAbilityItems,
		saveAbilityItems,
	};
};
