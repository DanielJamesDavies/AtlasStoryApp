// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../../CharactersContext";
import { APIContext } from "../../../../context/APIContext";

// Services
import isValidHexColour from "../../../../services/IsValidHexColour";

// Styles

// Assets

export const CharactersCharacterTypeColourLogic = () => {
	const { isAuthorizedToEdit, story, setStoryCharacterTypes, characterType, setCharacterType } = useContext(CharactersContext);
	const { APIRequest } = useContext(APIContext);

	function changeCharacterTypeColour(colour) {
		setStoryCharacterTypes((oldCharacterTypes) => {
			let newCharacterTypes = JSON.parse(JSON.stringify(oldCharacterTypes));
			const characterTypeIndex = newCharacterTypes.findIndex((e) => e._id === characterType._id);
			if (characterTypeIndex === -1) return newCharacterTypes;

			newCharacterTypes[characterTypeIndex].data.colour = colour;
			setCharacterType(newCharacterTypes[characterTypeIndex]);

			return newCharacterTypes;
		});
	}

	async function revertCharacterTypeColour() {
		const response = await APIRequest("/character-type/get-value/" + characterType._id, "POST", {
			story_id: story._id,
			path: ["data", "colour"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setStoryCharacterTypes((oldCharacterTypes) => {
			let newCharacterTypes = JSON.parse(JSON.stringify(oldCharacterTypes));
			const characterTypeIndex = newCharacterTypes.findIndex((e) => e._id === characterType._id);
			if (characterTypeIndex === -1) return newCharacterTypes;

			newCharacterTypes[characterTypeIndex].data.colour = response.data.value;
			setCharacterType(newCharacterTypes[characterTypeIndex]);

			return newCharacterTypes;
		});

		return true;
	}

	async function saveCharacterTypeColour() {
		let newCharacterType = JSON.parse(JSON.stringify(characterType));
		if (!isValidHexColour(newCharacterType.data.colour)) return false;

		const response = await APIRequest("/character-type/" + characterType._id, "PATCH", {
			story_id: story._id,
			path: ["data", "colour"],
			newValue: newCharacterType.data.colour,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, characterType, changeCharacterTypeColour, revertCharacterTypeColour, saveCharacterTypeColour };
};
