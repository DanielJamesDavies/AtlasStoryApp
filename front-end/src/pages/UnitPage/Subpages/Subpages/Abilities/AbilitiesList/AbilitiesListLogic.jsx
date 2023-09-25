// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const AbilitiesListLogic = ({ currAbility, switchAbility }) => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitVersion, changeUnitVersion } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	async function addAbility() {
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newUnitVersion.abilities.push({
			_id: new_id_response.data._id,
			name: "New Ability",
			primaryStatistic: { label: "", value: "" },
			items: [],
			statistics: { values: [], maxValue: 12 },
		});
		changeUnitVersion(newUnitVersion);
	}

	function removeAbility(e, index) {
		e.stopPropagation();
		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		if (currAbility?._id === newUnitVersion.abilities[index]._id) switchAbility(newUnitVersion.abilities[0]._id);
		newUnitVersion.abilities.splice(index, 1);
		changeUnitVersion(newUnitVersion);
	}

	const [isReorderingAbilities, setIsReorderingAbilities] = useState(false);
	function toggleIsReorderingAbilities() {
		setIsReorderingAbilities((oldIsReorderingAbilities) => !oldIsReorderingAbilities);
	}

	function reorderAbilities(res) {
		if (res.from === undefined || res.to === undefined) return false;

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const tempAbility = newUnitVersion.abilities.splice(res.from, 1)[0];
		newUnitVersion.abilities.splice(res.to, 0, tempAbility);
		changeUnitVersion(newUnitVersion);
	}

	async function revertAbilities() {
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "abilities"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.abilities = response.data.value.map((ability) => {
			const abilityIndex = newUnitVersion.abilities.findIndex((e) => e._id === ability._id);
			if (abilityIndex !== -1) return newUnitVersion.abilities[abilityIndex];
			return ability;
		});
		changeUnitVersion(newUnitVersion);

		return true;
	}

	async function saveAbilities() {
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "abilities"],
			newValue: unitVersion.abilities,
		});
		if (!response) return false;
		return true;
	}

	function onClickAbility(ability) {
		switchAbility(ability._id);
	}

	const [abilitiesListItemsRefCurrent, abilitiesListItemsRef] = useState(undefined);
	function onAbilitiesListScroll(e) {
		if (abilitiesListItemsRefCurrent?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		unitVersion,
		addAbility,
		removeAbility,
		isReorderingAbilities,
		toggleIsReorderingAbilities,
		reorderAbilities,
		revertAbilities,
		saveAbilities,
		onClickAbility,
		abilitiesListItemsRef,
		onAbilitiesListScroll,
	};
};
