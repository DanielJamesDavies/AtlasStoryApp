// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../../CharactersContext";
import { APIContext } from "../../../../context/APIContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const CharactersCreateCharacterLogic = () => {
	const { story_uid, story, group, isDisplayingCreateCharacterForm, setIsDisplayingCreateCharacterForm } = useContext(CharactersContext);

	function closeCreateCharacterForm() {
		setIsDisplayingCreateCharacterForm(false);
	}

	const [characterUIDSuggestions, setCharacterUIDSuggestions] = useState([]);

	function updateCharacterUIDSuggestions(newName) {
		let newCharacterUIDSuggestions = [];

		newCharacterUIDSuggestions.push(newName.toLowerCase().split(" ").join(""));

		const newNameSplitBySpace = newName.split(" ");
		if (newNameSplitBySpace.length > 1) newCharacterUIDSuggestions.push(newNameSplitBySpace.join("-").toLowerCase());

		if (newName.toLowerCase() !== newName) newCharacterUIDSuggestions.push(newName.split(" ").join(""));

		if (newNameSplitBySpace.length > 1 && newName.toLowerCase() !== newName) newCharacterUIDSuggestions.push(newNameSplitBySpace.join("-"));

		setCharacterUIDSuggestions(newCharacterUIDSuggestions);
	}

	const [characterName, setCharacterName] = useState("");
	function changeCharacterName(e) {
		setCharacterName(e.target.value);
		updateCharacterUIDSuggestions(e.target.value);
	}

	const [characterUID, setCharacterUID] = useState("");
	function changeCharacterUID(e) {
		setCharacterUID(e.target.value.split(" ").join("-"));
	}

	const [characterIsPrimaryCharacter, setCharacterIsPrimaryCharacter] = useState(false);
	function toggleCharacterIsPrimaryCharacter() {
		setCharacterIsPrimaryCharacter((oldCharacterIsPrimaryCharacter) => !oldCharacterIsPrimaryCharacter);
	}

	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [errors, setErrors] = useState([]);

	async function submitCreateCharacter() {
		setErrors([]);
		const currStory = JSON.parse(JSON.stringify(story));
		const currGroup = JSON.parse(JSON.stringify(group));
		if (!currStory?._id || !currGroup?._id) return;

		const response = await APIRequest("/character", "POST", {
			story_id: currStory._id,
			group_id: currGroup?._id,
			name: JSON.parse(JSON.stringify(characterName)),
			uid: JSON.parse(JSON.stringify(characterUID)),
			isPrimaryCharacter: JSON.parse(JSON.stringify(characterIsPrimaryCharacter)),
		});
		if (!response) return;
		if (response?.errors) return setErrors(response.errors);
		if (currStory?.uid && response?.data?.character_uid) changeLocation("/s/" + currStory.uid + "/c/" + response.data.character_uid);
	}

	return {
		story_uid,
		isDisplayingCreateCharacterForm,
		closeCreateCharacterForm,
		characterName,
		changeCharacterName,
		characterUID,
		changeCharacterUID,
		characterUIDSuggestions,
		characterIsPrimaryCharacter,
		toggleCharacterIsPrimaryCharacter,
		errors,
		submitCreateCharacter,
	};
};
