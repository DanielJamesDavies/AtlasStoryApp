// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";

// Services

// Styles

// Assets

export const CharactersCharacterTypeLogic = () => {
	const { isAuthorizedToModify, setCharacterTypes, characterType, setCharacterType } = useContext(CharactersContext);

	// Edit Name
	const [isEditingCharacterTypeName, setIsEditingCharacterTypeName] = useState(false);

	function beginEditingCharacterTypeName() {
		if (!isAuthorizedToModify) return;
		setIsEditingCharacterTypeName(true);
	}

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

	// Edit Description
	const [isEditingCharacterTypeDescription, setIsEditingCharacterTypeDescription] = useState(false);

	function beginEditingCharacterTypeDescription() {
		if (!isAuthorizedToModify) return;
		setIsEditingCharacterTypeDescription(true);
	}

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

	// Set State to Default
	const [currCharacterTypeID, setCurrCharacterTypeID] = useState("");
	useEffect(() => {
		function setStateToDefault() {
			if (currCharacterTypeID === characterType._id) return;

			setIsEditingCharacterTypeName(false);
			setIsEditingCharacterTypeDescription(false);
			setCurrCharacterTypeID(characterType._id);
		}

		setStateToDefault();
	}, [characterType, currCharacterTypeID, setCurrCharacterTypeID, setIsEditingCharacterTypeName, setIsEditingCharacterTypeDescription]);

	return {
		characterType,
		isEditingCharacterTypeName,
		beginEditingCharacterTypeName,
		changeCharacterTypeName,
		isEditingCharacterTypeDescription,
		beginEditingCharacterTypeDescription,
		changeCharacterTypeDescription,
	};
};
