// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const CharactersCharacterTypeColourLogic = () => {
	const { isAuthorizedToEdit, story, setCharacterTypes, characterType, setCharacterType } = useContext(CharactersContext);
	const { APIRequest } = useContext(APIContext);

	const [colourBlockStyle, setColourBlockStyle] = useState({});

	useEffect(() => {
		function isHexColour(colour) {
			if (!colour) return false;
			var colourArray = colour.split("");
			var isValid = colourArray
				.map((value, index) => {
					if (index === 0) {
						if (value === "#") return "y";
						return "n";
					} else {
						if (parseInt(value, 16).toString(16) === value) return "y";
						return "n";
					}
				})
				.join("");
			if (isValid !== "yyyyyyy" && isValid !== "yyyy") return false;
			return true;
		}

		setColourBlockStyle(isHexColour(characterType?.data?.colour) ? { background: characterType.data.colour } : {});
	}, [characterType]);

	function changeCharacterTypeColour(e) {
		setCharacterTypes((oldCharacterTypes) => {
			let newCharacterTypes = JSON.parse(JSON.stringify(oldCharacterTypes));
			const characterTypeIndex = newCharacterTypes.findIndex((e) => e._id === characterType._id);
			if (characterTypeIndex === -1) return newCharacterTypes;

			newCharacterTypes[characterTypeIndex].data.colour = e.target.value;
			setCharacterType(newCharacterTypes[characterTypeIndex]);

			return newCharacterTypes;
		});
	}

	async function revertCharacterTypeColour() {
		const response = await APIRequest("/character-type/get-value/" + characterType._id, "POST", {
			story_id: story._id,
			path: ["data", "colour"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		setCharacterTypes((oldCharacterTypes) => {
			let newCharacterTypes = JSON.parse(JSON.stringify(oldCharacterTypes));
			const characterTypeIndex = newCharacterTypes.findIndex((e) => e._id === characterType._id);
			if (characterTypeIndex === -1) return newCharacterTypes;

			newCharacterTypes[characterTypeIndex].data.colour = response.data.value;
			setCharacterType(newCharacterTypes[characterTypeIndex]);

			return newCharacterTypes;
		});

		return true;
	}

	async function saveCharacterTypeColour() {
		let newCharacterType = JSON.parse(JSON.stringify(characterType));

		const response = await APIRequest("/character-type/" + characterType._id, "PATCH", {
			story_id: story._id,
			path: ["data", "colour"],
			newValue: newCharacterType.data.colour,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, colourBlockStyle, characterType, changeCharacterTypeColour, revertCharacterTypeColour, saveCharacterTypeColour };
};
