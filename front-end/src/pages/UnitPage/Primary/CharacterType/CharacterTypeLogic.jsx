// Packages
import { useContext, useEffect, useRef, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const CharacterTypeLogic = () => {
	const { isAuthorizedToEdit, story, unit, setUnit, storyCharacterTypes } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	const [characterType, setUnitType] = useState({});

	const prevCharacterTypeID = useRef();
	useEffect(() => {
		const newCharacterType =
			storyCharacterTypes.findIndex((e) => e._id === unit?.character_type_id) === -1
				? {}
				: storyCharacterTypes.find((e) => e._id === unit?.character_type_id);
		if (newCharacterType !== prevCharacterTypeID.current) {
			setUnitType(newCharacterType);
			prevCharacterTypeID.current = newCharacterType;
		}
	}, [prevCharacterTypeID, unit, storyCharacterTypes, setUnitType]);

	function changeCharacterType(index) {
		setUnit((oldCharacter) => {
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
		const response = await APIRequest("/character/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["character_type_id"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUnit((oldCharacter) => {
			let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
			newCharacter.character_type_id = response.data.value;
			return newCharacter;
		});

		return true;
	}

	async function saveCharacterType() {
		const response = await APIRequest("/character/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["character_type_id"],
			newValue: unit.character_type_id,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		story,
		storyCharacterTypes,
		characterType,
		changeCharacterType,
		revertCharacterType,
		saveCharacterType,
	};
};
