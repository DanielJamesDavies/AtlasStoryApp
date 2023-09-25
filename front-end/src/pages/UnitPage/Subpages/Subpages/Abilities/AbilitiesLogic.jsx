// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../UnitPageContext";

// Services

// Styles

// Assets

export const AbilitiesLogic = () => {
	const { unit, unitVersion, changeUnitVersion } = useContext(UnitPageContext);
	const [ability, setAbility] = useState(false);

	useEffect(() => {
		function getAbility() {
			let newAbility = false;
			let index = 0;

			const oldAbility = JSON.parse(JSON.stringify(ability));
			if (oldAbility !== false) {
				const oldVersion = unit?.data?.versions?.find((e) => e?._id === oldAbility?.character_version_id);
				const oldIndex = oldVersion?.abilities?.findIndex((e) => e?._id === oldAbility?._id);
				if (oldIndex !== -1) index = oldIndex;
			}

			if (unitVersion.abilities.length > 0) {
				if (unitVersion.abilities.length - 1 < index) index = unitVersion.abilities.length - 1;
				newAbility = JSON.parse(JSON.stringify(unitVersion.abilities[index]));
				newAbility.character_version_id = unitVersion?._id;
			}
			return newAbility;
		}
		if (ability?.character_version_id !== unitVersion?._id) setAbility(getAbility());
	}, [unit, unitVersion, ability]);

	function changeAbility(newAbility) {
		setAbility(newAbility);

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const newAbilityIndex = newUnitVersion.abilities.findIndex((e) => e?._id === newAbility?._id);
		if (newAbilityIndex === -1) return false;
		newUnitVersion.abilities[newAbilityIndex] = newAbility;
		changeUnitVersion(newUnitVersion);
	}

	function switchAbility(abilityID) {
		if (abilityID === ability._id) return false;

		let newAbility = false;
		const newAbilityIndex = unitVersion.abilities.findIndex((e) => e._id === abilityID);
		if (newAbilityIndex === -1) return setAbility(newAbility);

		newAbility = JSON.parse(JSON.stringify(unitVersion.abilities[newAbilityIndex]));
		newAbility.character_version_id = unitVersion?._id;
		setAbility(newAbility);
	}

	return { ability, changeAbility, switchAbility };
};
