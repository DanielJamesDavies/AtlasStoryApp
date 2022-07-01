// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../../CharacterContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const AbilityPrimaryStatisticLogic = ({ ability, changeAbility }) => {
	const { isAuthorizedToEdit, story, character, characterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	const [primaryStatisticValueClassName, setPrimaryStatisticValueClassName] = useState(
		"character-subpage-abilities-ability-primary-statistic-value"
	);

	useEffect(() => {
		function getPrimaryStatisticValueClassName() {
			let newClassName = "character-subpage-abilities-ability-primary-statistic-value";
			if (ability?.primaryStatistic?.value === "∞") newClassName += " character-subpage-abilities-ability-primary-statistic-value-symbol";
			return newClassName;
		}
		setPrimaryStatisticValueClassName(getPrimaryStatisticValueClassName());
	}, [setPrimaryStatisticValueClassName, ability]);

	function changeAbilityPrimaryStatisticLabel(e) {
		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.primaryStatistic.label = e.target.value;
		changeAbility(newAbility);
	}

	function changeAbilityPrimaryStatisticValue(e) {
		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.primaryStatistic.value = e.target.value;
		changeAbility(newAbility);
	}

	async function revertAbilityPrimaryStatistic() {
		if (!character?._id || !characterVersion?._id) return;
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "abilities", ability._id, "primaryStatistic"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.primaryStatistic = response.data.value;
		changeAbility(newAbility);

		return true;
	}

	async function saveAbilityPrimaryStatistic() {
		if (!character?._id || !characterVersion?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "abilities", ability._id, "primaryStatistic"],
			newValue: ability.primaryStatistic,
		});
		if (!response) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		primaryStatisticValueClassName,
		changeAbilityPrimaryStatisticLabel,
		changeAbilityPrimaryStatisticValue,
		revertAbilityPrimaryStatistic,
		saveAbilityPrimaryStatistic,
	};
};
