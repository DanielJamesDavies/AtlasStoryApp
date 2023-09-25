// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../../UnitPageContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const AbilityNameLogic = ({ ability, changeAbility }) => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitVersion } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changeAbilityName(e) {
		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.name = e.target.value;
		changeAbility(newAbility);
	}

	async function revertAbilityName() {
		if (!unit?._id || !unitVersion?._id) return;
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "abilities", ability._id, "name"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.name = response.data.value;
		changeAbility(newAbility);

		return true;
	}

	async function saveAbilityName() {
		if (!unit?._id || !unitVersion?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "abilities", ability._id, "name"],
			newValue: ability.name,
		});
		if (!response) return false;
		return true;
	}

	return { isAuthorizedToEdit, changeAbilityName, revertAbilityName, saveAbilityName };
};
