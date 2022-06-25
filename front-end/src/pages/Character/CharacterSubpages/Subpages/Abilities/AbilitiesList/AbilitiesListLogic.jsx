// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const AbilitiesListLogic = () => {
	const { isAuthorizedToEdit, characterVersion, changeCharacterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	async function addAbility() {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		newCharacterVersion.abilities.push({ _id: new_id_response.data._id, name: "", items: [] });
		changeCharacterVersion(newCharacterVersion);
	}

	return { isAuthorizedToEdit, characterVersion, addAbility };
};
