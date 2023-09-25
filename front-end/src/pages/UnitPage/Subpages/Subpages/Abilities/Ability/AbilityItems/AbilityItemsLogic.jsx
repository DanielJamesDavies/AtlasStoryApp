// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../../UnitPageContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const AbilityItemsLogic = ({ ability, changeAbility }) => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitVersion } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	async function addAbilityItem() {
		let newAbility = JSON.parse(JSON.stringify(ability));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newAbility.items.push({
			_id: new_id_response.data._id,
			title: "",
			text: [""],
			images: [],
			statistics: { values: [], maxValue: 100 },
		});
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
		if (!unit?._id || !unitVersion?._id) return;
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "abilities", ability._id, "items"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.items = response.data.value;
		changeAbility(newAbility);

		return true;
	}

	async function saveAbilityItems() {
		if (!unit?._id || !unitVersion?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "abilities", ability._id, "items"],
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
