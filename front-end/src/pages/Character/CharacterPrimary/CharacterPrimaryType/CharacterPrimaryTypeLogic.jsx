// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../CharacterContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles
import isLightBackground from "../../../../services/IsLightBackground";

// Assets

export const CharacterPrimaryTypeLogic = () => {
	const { isAuthorizedToEdit, story, character, setCharacter, storyCharacterTypes, isOnOverviewSection, characterOverviewBackground } =
		useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	const [characterType, setCharacterType] = useState({});

	useEffect(() => {
		setCharacterType(
			storyCharacterTypes.findIndex((e) => e._id === character?.character_type_id) === -1
				? {}
				: storyCharacterTypes.find((e) => e._id === character?.character_type_id)
		);
	}, [character, storyCharacterTypes, setCharacterType]);

	function changeCharacterType(index) {
		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			if (!storyCharacterTypes[index]?._id) {
				newCharacter.character_type_id = undefined;
			} else {
				newCharacter.character_type_id = storyCharacterTypes[index]._id;
			}
			return newCharacter;
		});
		return true;
	}

	async function revertCharacterType() {
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["character_type_id"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setCharacter((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.character_type_id = response.data.value;
			return newCharacter;
		});

		return true;
	}

	async function saveCharacterType() {
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["character_type_id"],
			newValue: character.character_type_id,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	const [primaryTypeIsLight, setPrimaryTypeIsLight] = useState(true);

	useEffect(() => {
		async function getPrimaryTypeIsLight() {
			if (!isOnOverviewSection) return setPrimaryTypeIsLight(false);
			if (!characterOverviewBackground) setPrimaryTypeIsLight(true);
			const isDark = await isLightBackground(characterOverviewBackground, [0, 40], [-1, 115]);
			setPrimaryTypeIsLight(!isDark);
		}
		getPrimaryTypeIsLight();
	}, [characterOverviewBackground, isOnOverviewSection, setPrimaryTypeIsLight]);

	return {
		isAuthorizedToEdit,
		story,
		storyCharacterTypes,
		characterType,
		changeCharacterType,
		revertCharacterType,
		saveCharacterType,
		primaryTypeIsLight,
	};
};
