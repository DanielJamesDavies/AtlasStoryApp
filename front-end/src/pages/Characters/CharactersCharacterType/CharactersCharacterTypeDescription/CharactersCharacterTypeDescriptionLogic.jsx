// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../../CharactersContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const CharactersCharacterTypeDescriptionLogic = () => {
	const { isAuthorizedToEdit, story, setStoryCharacterTypes, characterType, setCharacterType } = useContext(CharactersContext);
	const { APIRequest } = useContext(APIContext);

	function changeCharacterTypeDescription(e) {
		setStoryCharacterTypes((oldCharacterTypes) => {
			let newCharacterTypes = JSON.parse(JSON.stringify(oldCharacterTypes));
			const characterTypeIndex = newCharacterTypes.findIndex((e) => e._id === characterType._id);
			if (characterTypeIndex === -1) return newCharacterTypes;

			newCharacterTypes[characterTypeIndex].data.description = e.target.value.split("\n");
			setCharacterType(newCharacterTypes[characterTypeIndex]);

			return newCharacterTypes;
		});
	}

	async function revertCharacterTypeDescription() {
		const response = await APIRequest("/character-type/get-value/" + characterType._id, "POST", {
			story_id: story._id,
			path: ["data", "description"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setStoryCharacterTypes((oldCharacterTypes) => {
			let newCharacterTypes = JSON.parse(JSON.stringify(oldCharacterTypes));
			const characterTypeIndex = newCharacterTypes.findIndex((e) => e._id === characterType._id);
			if (characterTypeIndex === -1) return newCharacterTypes;

			newCharacterTypes[characterTypeIndex].data.description = response.data.value;
			setCharacterType(newCharacterTypes[characterTypeIndex]);

			return newCharacterTypes;
		});

		return true;
	}

	async function saveCharacterTypeDescription() {
		let newCharacterType = JSON.parse(JSON.stringify(characterType));

		const response = await APIRequest("/character-type/" + newCharacterType._id, "PATCH", {
			story_id: story._id,
			path: ["data", "description"],
			newValue: newCharacterType.data.description,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, characterType, changeCharacterTypeDescription, revertCharacterTypeDescription, saveCharacterTypeDescription };
};
