// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../../../context/StoryContext";
import { RoutesContext } from "../../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const CharacterCardLogic = ({ character }) => {
	const { changeLocation } = useContext(RoutesContext);
	const { story, characterTypes } = useContext(StoryContext);

	const [characterType, setCharacterType] = useState(false);

	useEffect(() => {
		const newCharacterType = characterTypes?.find((e) => e._id === character?.character_type_id);
		setCharacterType(newCharacterType === undefined ? false : newCharacterType);
	}, [character, characterTypes, setCharacterType]);

	function navigateToCharacter(e) {
		if (story?.uid && character?.uid) changeLocation("/s/" + story.uid + "/c/" + character.uid, e.button === 1);
	}

	function onCharacterCardMouseDown(e) {
		if (e.button === 1) e.preventDefault();
	}

	const [cardStyles, setCardStyles] = useState({});
	useEffect(() => {
		setCardStyles({ "--characterColour": character?.data?.colour ? character.data.colour : "#0044ff" });
	}, [character, setCardStyles]);

	return { characterType, navigateToCharacter, onCharacterCardMouseDown, cardStyles };
};
