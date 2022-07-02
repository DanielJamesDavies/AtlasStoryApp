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
	const { characterVersion, changeCharacterVersion } = useContext(CharacterContext);
	const [ability, setAbility] = useState(false);

	useEffect(() => {
		function getAbility() {
			const oldAbility = JSON.parse(JSON.stringify(ability));
			console.log(oldAbility);
			// Get index of old ability
			let newAbility = false;
			if (characterVersion.abilities.length > 0) {
				newAbility = JSON.parse(JSON.stringify(characterVersion.abilities[0]));
				newAbility.character_version_id = characterVersion?._id;
			}
			return newAbility;
		}
		if (ability?.character_version_id !== characterVersion?._id) setAbility(getAbility());
	}, [characterVersion, ability]);

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
