// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../../../CharactersContext";
import { RoutesContext } from "../../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const CharactersGroupCharacterCardLogic = ({ characterID }) => {
	const { story, storyCharacters, storyCharacterTypes } = useContext(CharactersContext);
	const { changeLocation } = useContext(RoutesContext);

	const [character, setCharacter] = useState(false);
	const [characterType, setCharacterType] = useState(false);

	useEffect(() => {
		if (characterID) {
			const newCharacter = storyCharacters?.find((e) => e._id === characterID);
			setCharacter(newCharacter);

			const newCharacterType = storyCharacterTypes?.find((e) => e._id === newCharacter?.character_type_id);
			setCharacterType(newCharacterType === undefined ? false : newCharacterType);
		}
	}, [characterID, storyCharacters, storyCharacterTypes, setCharacter, setCharacterType]);

	function navigateToCharacter(e) {
		if (e.button === 2) return;
		e.preventDefault();
		if (story?.uid && character?.uid) changeLocation("/s/" + story.uid + "/c/" + character.uid, e.button === 1);
	}

	function onCharacterCardMouseDown(e) {
		if (e.button === 1) e.preventDefault();
	}

	// Character Colour Styles
	const [cardStyles, setCardStyles] = useState({});

	useEffect(() => {
		setCardStyles({ "--characterColour": character?.data?.colour ? character.data.colour : "#0044ff" });
	}, [character, setCardStyles]);

	return {
		character,
		characterType,
		navigateToCharacter,
		onCharacterCardMouseDown,
		cardStyles,
	};
};
