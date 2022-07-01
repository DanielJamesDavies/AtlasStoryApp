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

export const AbilitiesListLogic = () => {
	const { isAuthorizedToEdit, story, character, characterVersion, changeCharacterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	async function addAbility() {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newCharacterVersion.abilities.push({
			_id: new_id_response.data._id,
			name: "New Ability",
			primaryStatistic: { label: "", value: "" },
			items: [],
		});
		changeCharacterVersion(newCharacterVersion);
	}

	function removeAbility(e, index) {
		e.stopPropagation();
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.abilities.splice(index, 1);
		changeCharacterVersion(newCharacterVersion);
	}

	const [isReorderingAbilities, setIsReorderingAbilities] = useState(false);
	function toggleIsReorderingAbilities() {
		setIsReorderingAbilities((oldIsReorderingAbilities) => !oldIsReorderingAbilities);
	}

	function reorderAbilities(res) {
		if (res.from === undefined || res.to === undefined) return false;

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const tempAbility = newCharacterVersion.abilities.splice(res.from, 1)[0];
		newCharacterVersion.abilities.splice(res.to, 0, tempAbility);
		changeCharacterVersion(newCharacterVersion);
	}

	async function revertAbilities() {
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "abilities"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.abilities = response.data.value.map((ability) => {
			const abilityIndex = newCharacterVersion.abilities.findIndex((e) => e._id === ability._id);
			if (abilityIndex !== -1) return newCharacterVersion.abilities[abilityIndex];
			return ability;
		});
		changeCharacterVersion(newCharacterVersion);

		return true;
	}

	async function saveAbilities() {
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "abilities"],
			newValue: characterVersion.abilities,
		});
		if (!response) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		characterVersion,
		addAbility,
		removeAbility,
		isReorderingAbilities,
		toggleIsReorderingAbilities,
		reorderAbilities,
		revertAbilities,
		saveAbilities,
	};
};
