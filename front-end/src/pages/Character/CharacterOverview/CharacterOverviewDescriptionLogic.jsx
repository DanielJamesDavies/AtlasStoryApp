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
	const { isAuthorizedToEdit, story, character, setCharacter } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function changeDescription(e) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.description = e.target.value.split("\n");
			return newCharacter;
		});
	}

	async function revertDescription() {
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "description"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.description = response.data.value;
			return newCharacter;
		});

		return true;
	}

	async function saveDescription() {
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "description"],
			newValue: character.data.description,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, character, changeDescription, revertDescription, saveDescription };
};
