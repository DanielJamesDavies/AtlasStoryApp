// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../../CharacterContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const AbilityNameLogic = ({ ability, changeAbility }) => {
	const { isAuthorizedToEdit, story, character, characterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function changeAbilityName(e) {
		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.name = e.target.value;
		changeAbility(newAbility);
	}

	async function revertAbilityName() {
		if (!character?._id || !characterVersion?._id) return;
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "abilities", ability._id, "name"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.name = response.data.value;
		changeAbility(newAbility);

		return true;
	}

	async function saveAbilityName() {
		if (!character?._id || !characterVersion?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "abilities", ability._id, "name"],
			newValue: ability.name,
		});
		if (!response) return false;
		return true;
	}

	return { isAuthorizedToEdit, changeAbilityName, revertAbilityName, saveAbilityName };
};
