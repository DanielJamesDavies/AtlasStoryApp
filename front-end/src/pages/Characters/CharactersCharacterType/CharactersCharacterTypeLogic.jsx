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

export const CharactersCharacterTypeLogic = () => {
	const { isAuthorizedToEdit, story, setStory, setCharacterTypes, characterType, setCharacterType } = useContext(CharactersContext);
	const { APIRequest } = useContext(APIContext);

	async function deleteCharacterType() {
		let newCharacterType = JSON.parse(JSON.stringify(characterType));

		const response = await APIRequest("/character-type/" + newCharacterType._id, "DELETE", {
			story_id: story._id,
		});
		if (!response || response?.errors) return false;

		setCharacterTypes((oldCharacterTypes) => {
			let newCharacterTypes = JSON.parse(JSON.stringify(oldCharacterTypes));
			const characterTypeIndex = newCharacterTypes.findIndex((e) => e._id === newCharacterType._id);
			if (characterTypeIndex === -1) return newCharacterTypes;
			newCharacterTypes.splice(characterTypeIndex, 1);
			setCharacterType(newCharacterTypes[0] === undefined ? false : newCharacterTypes[0]);
			return newCharacterTypes;
		});

		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			const characterTypeIndex = newStory.data.characterTypes.findIndex((e) => e === newCharacterType._id);
			if (characterTypeIndex === -1) return newStory;
			newStory.data.characterTypes.splice(characterTypeIndex, 1);
			return newStory;
		});
	}

	return { isAuthorizedToEdit, characterType, deleteCharacterType };
};
