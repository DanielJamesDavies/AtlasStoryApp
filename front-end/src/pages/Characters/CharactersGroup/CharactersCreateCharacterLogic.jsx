// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";
import { APIContext } from "../../../context/APIContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const CharactersCreateCharacterLogic = () => {
	const { story, groups, openGroup, isDisplayingCreateCharacterForm, setIsDisplayingCreateCharacterForm } = useContext(CharactersContext);

	function closeCreateCharacterForm() {
		setIsDisplayingCreateCharacterForm(false);
	}

	const [characterName, setCharacterName] = useState("");
	function changeCharacterName(e) {
		setCharacterName(e.target.value);
	}

	const [characterURL, setCharacterURL] = useState("");
	function changeCharacterURL(e) {
		setCharacterURL(e.target.value);
	}

	const [characterIsPrimaryCharacter, setCharacterIsPrimaryCharacter] = useState(false);
	function toggleCharacterIsPrimaryCharacter() {
		setCharacterIsPrimaryCharacter((oldCharacterIsPrimaryCharacter) => !oldCharacterIsPrimaryCharacter);
	}

	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [errors, setErrors] = useState([]);

	async function submitCreateCharacter() {
		const currStory = JSON.parse(JSON.stringify(story));
		const currGroups = JSON.parse(JSON.stringify(groups));
		const currOpenGroup = JSON.parse(JSON.stringify(openGroup));
		if (!currStory?._id || !currGroups[currOpenGroup]?._id) return;

		const response = await APIRequest("/character", "POST", {
			story_id: currStory._id,
			group_id: currGroups[currOpenGroup]._id,
			name: JSON.parse(JSON.stringify(characterName)),
			url: JSON.parse(JSON.stringify(characterURL)),
			isPrimaryCharacter: JSON.parse(JSON.stringify(characterIsPrimaryCharacter)),
		});
		if (!response) return;
		if (response?.errors) return setErrors(response.errors);
		if (currStory?.url && response?.data?.characterURL) changeLocation("/s/" + currStory.url + "/c/" + response.data.characterURL);
	}

	useEffect(() => {
		setCharacterName("");
		setCharacterURL("");
		setErrors([]);
	}, [isDisplayingCreateCharacterForm]);

	return {
		isDisplayingCreateCharacterForm,
		closeCreateCharacterForm,
		characterName,
		changeCharacterName,
		characterURL,
		changeCharacterURL,
		characterIsPrimaryCharacter,
		toggleCharacterIsPrimaryCharacter,
		errors,
		submitCreateCharacter,
	};
};
