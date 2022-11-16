// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../../CharactersContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const CharactersCreateCharacterTypeLogic = () => {
	const { story, setStory, setCharacterTypes, isDisplayingCreateCharacterTypeForm, setIsDisplayingCreateCharacterTypeForm } =
		useContext(CharactersContext);

	function closeCreateCharacterTypeForm() {
		setIsDisplayingCreateCharacterTypeForm(false);
	}

	const [characterTypeName, setCharacterTypeName] = useState("");
	function changeCharacterTypeName(e) {
		setCharacterTypeName(e.target.value);
	}

	const [characterTypeColour, setCharacterTypeColour] = useState("");
	function changeCharacterTypeColour(e) {
		setCharacterTypeColour(e.target.value);
	}

	const { APIRequest } = useContext(APIContext);
	const [errors, setErrors] = useState([]);

	async function submitCreateCharacterType() {
		const currStory = JSON.parse(JSON.stringify(story));
		if (!currStory?._id) return;

		const response = await APIRequest("/character-type", "POST", {
			story_id: currStory._id,
			name: JSON.parse(JSON.stringify(characterTypeName)),
			colour: JSON.parse(JSON.stringify(characterTypeColour)),
		});
		if (!response) return;
		if (response?.errors) return setErrors(response.errors);

		if (response?.data?.characterType) {
			setCharacterTypes((oldCharacterTypes) => {
				let newCharacterTypes = JSON.parse(JSON.stringify(oldCharacterTypes));
				newCharacterTypes.push(response.data.characterType);
				return newCharacterTypes;
			});
			setIsDisplayingCreateCharacterTypeForm(false);
		}
		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			newStory.data.characterTypes.push(response.data.characterType._id);
			return newStory;
		});
	}

	return {
		isDisplayingCreateCharacterTypeForm,
		closeCreateCharacterTypeForm,
		characterTypeName,
		changeCharacterTypeName,
		characterTypeColour,
		changeCharacterTypeColour,
		errors,
		submitCreateCharacterType,
	};
};
