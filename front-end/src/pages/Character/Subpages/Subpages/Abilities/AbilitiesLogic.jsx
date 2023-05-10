// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../CharacterContext";

// Services

// Styles

// Assets

export const AbilitiesLogic = () => {
	const { character, characterVersion, changeCharacterVersion } = useContext(CharacterContext);
	const [ability, setAbility] = useState(false);

	useEffect(() => {
		function getAbility() {
			let newAbility = false;
			let index = 0;

			const oldAbility = JSON.parse(JSON.stringify(ability));
			if (oldAbility !== false) {
				const oldVersion = character?.data?.versions?.find((e) => e?._id === oldAbility?.character_version_id);
				const oldIndex = oldVersion?.abilities?.findIndex((e) => e?._id === oldAbility?._id);
				if (oldIndex !== -1) index = oldIndex;
			}

			if (characterVersion.abilities.length > 0) {
				if (characterVersion.abilities.length - 1 < index) index = characterVersion.abilities.length - 1;
				newAbility = JSON.parse(JSON.stringify(characterVersion.abilities[index]));
				newAbility.character_version_id = characterVersion?._id;
			}
			return newAbility;
		}
		if (ability?.character_version_id !== characterVersion?._id) setAbility(getAbility());
	}, [character, characterVersion, ability]);

	function changeAbility(newAbility) {
		setAbility(newAbility);

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const newAbilityIndex = newCharacterVersion.abilities.findIndex((e) => e?._id === newAbility?._id);
		if (newAbilityIndex === -1) return false;
		newCharacterVersion.abilities[newAbilityIndex] = newAbility;
		changeCharacterVersion(newCharacterVersion);
	}

	function switchAbility(abilityID) {
		if (abilityID === ability._id) return false;

		let newAbility = false;
		const newAbilityIndex = characterVersion.abilities.findIndex((e) => e._id === abilityID);
		if (newAbilityIndex === -1) return setAbility(newAbility);

		newAbility = JSON.parse(JSON.stringify(characterVersion.abilities[newAbilityIndex]));
		newAbility.character_version_id = characterVersion?._id;
		setAbility(newAbility);
	}

	return { ability, changeAbility, switchAbility };
};
