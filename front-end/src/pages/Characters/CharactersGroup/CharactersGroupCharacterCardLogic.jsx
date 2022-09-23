// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const CharactersGroupCharacterCardLogic = ({ characterID }) => {
	const { story, characters, characterTypes, charactersCardBackgrounds } = useContext(CharactersContext);
	const { changeLocation } = useContext(RoutesContext);

	const [character, setCharacter] = useState(false);
	const [cardBackground, setCardBackground] = useState(false);
	const [characterType, setCharacterType] = useState(false);

	useEffect(() => {
		const newCharacter = characters?.find((e) => e._id === characterID);
		setCharacter(newCharacter);

		const newCardBackground = charactersCardBackgrounds?.find((e) => e._id === newCharacter?.data?.cardBackground)?.image;
		setCardBackground(newCardBackground === undefined ? false : newCardBackground);

		const newCharacterType = characterTypes?.find((e) => e._id === newCharacter?.character_type_id);
		setCharacterType(newCharacterType === undefined ? false : newCharacterType);
	}, [characterID, characters, charactersCardBackgrounds, characterTypes, setCharacter, setCardBackground, setCharacterType]);

	function navigateToCharacter(e) {
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
		cardBackground,
		characterType,
		navigateToCharacter,
		onCharacterCardMouseDown,
		cardStyles,
	};
};
