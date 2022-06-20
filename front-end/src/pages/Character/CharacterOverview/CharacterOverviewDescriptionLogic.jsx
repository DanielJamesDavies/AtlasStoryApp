// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../CharacterContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const CharacterOverviewDescriptionLogic = () => {
	const { isAuthorizedToEdit, story, character, characterVersion, changeCharacterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function changeDescription(e) {
		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.description = e.target.value.split("\n");
		changeCharacterVersion(newCharacterVersion);
	}

	async function revertDescription() {
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "description"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.description = response.data.value;
		changeCharacterVersion(newCharacterVersion);

		return true;
	}

	async function saveDescription() {
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "description"],
			newValue: characterVersion.description,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, characterVersion, changeDescription, revertDescription, saveDescription };
};
