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

export const CharacterPrimaryNameLogic = () => {
	const { isAuthorizedToEdit, story, character, setCharacter } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function changeName(e) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.name = e.target.value;
			return newCharacter;
		});
	}

	async function revertName() {
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "name"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.name = response.data.value;
			return newCharacter;
		});

		return true;
	}

	async function saveName() {
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "name"],
			newValue: character.data.name,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, character, changeName, revertName, saveName };
};
