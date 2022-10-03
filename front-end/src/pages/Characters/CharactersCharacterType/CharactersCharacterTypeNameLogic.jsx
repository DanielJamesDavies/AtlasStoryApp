// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const CharactersCharacterTypeNameLogic = () => {
	const { isAuthorizedToEdit, story, setCharacterTypes, characterType, setCharacterType } = useContext(CharactersContext);
	const { APIRequest } = useContext(APIContext);

	function changeCharacterTypeName(e) {
		setCharacterTypes((oldCharacterTypes) => {
			let newCharacterTypes = JSON.parse(JSON.stringify(oldCharacterTypes));
			const characterTypeIndex = newCharacterTypes.findIndex((e) => e._id === characterType._id);
			if (characterTypeIndex === -1) return newCharacterTypes;

			newCharacterTypes[characterTypeIndex].data.name = e.target.value;
			setCharacterType(newCharacterTypes[characterTypeIndex]);

			return newCharacterTypes;
		});
	}

	async function revertCharacterTypeName() {
		const response = await APIRequest("/character-type/get-value/" + characterType._id, "POST", {
			story_id: story._id,
			path: ["data", "name"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setCharacterTypes((oldCharacterTypes) => {
			let newCharacterTypes = JSON.parse(JSON.stringify(oldCharacterTypes));
			const characterTypeIndex = newCharacterTypes.findIndex((e) => e._id === characterType._id);
			if (characterTypeIndex === -1) return newCharacterTypes;

			newCharacterTypes[characterTypeIndex].data.name = response.data.value;
			setCharacterType(newCharacterTypes[characterTypeIndex]);

			return newCharacterTypes;
		});

		return true;
	}

	async function saveCharacterTypeName() {
		let newCharacterType = JSON.parse(JSON.stringify(characterType));

		const response = await APIRequest("/character-type/" + characterType._id, "PATCH", {
			story_id: story._id,
			path: ["data", "name"],
			newValue: newCharacterType.data.name,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, characterType, changeCharacterTypeName, revertCharacterTypeName, saveCharacterTypeName };
};
