// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../../UnitPageContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const AbilityPrimaryStatisticLogic = ({ ability, changeAbility }) => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitVersion } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	const [primaryStatisticValueClassName, setPrimaryStatisticValueClassName] = useState(
		"unit-page-subpage-abilities-ability-primary-statistic-value"
	);

	useEffect(() => {
		function getPrimaryStatisticValueClassName() {
			let newClassName = "unit-page-subpage-abilities-ability-primary-statistic-value";
			if (ability?.primaryStatistic?.value === "∞") newClassName += " unit-page-subpage-abilities-ability-primary-statistic-value-symbol";
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
		if (!unit?._id || !unitVersion?._id) return;
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "abilities", ability._id, "primaryStatistic"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.primaryStatistic = response.data.value;
		changeAbility(newAbility);

		return true;
	}

	async function saveAbilityPrimaryStatistic() {
		if (!unit?._id || !unitVersion?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "abilities", ability._id, "primaryStatistic"],
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
