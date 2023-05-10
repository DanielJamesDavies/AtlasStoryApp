// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SettingsColourLogic = () => {
	const { isAuthorizedToEdit, story, character, setCharacter } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function changeColour(colour) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.colour = colour;
			return newCharacter;
		});
	}

	const [errors, setErrors] = useState([]);

	async function revertColour() {
		setErrors([]);
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "colour"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.data.colour = response.data.value;
			return newCharacter;
		});

		return true;
	}

	async function saveColour() {
		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "colour"],
			newValue: character.data.colour,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, character, changeColour, revertColour, saveColour, errors };
};
