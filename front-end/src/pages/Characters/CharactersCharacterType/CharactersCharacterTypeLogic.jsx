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

	// Edit Name
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
		if (!response || response?.errors || !response?.data?.value) return false;

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

	// Edit Description
	function changeCharacterTypeDescription(e) {
		setCharacterTypes((oldCharacterTypes) => {
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
		if (!response || response?.errors || !response?.data?.value) return false;

		setCharacterTypes((oldCharacterTypes) => {
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

	// Delete Character Type
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

	return {
		isAuthorizedToEdit,
		characterType,
		changeCharacterTypeName,
		revertCharacterTypeName,
		saveCharacterTypeName,
		changeCharacterTypeDescription,
		revertCharacterTypeDescription,
		saveCharacterTypeDescription,
		deleteCharacterType,
	};
};
