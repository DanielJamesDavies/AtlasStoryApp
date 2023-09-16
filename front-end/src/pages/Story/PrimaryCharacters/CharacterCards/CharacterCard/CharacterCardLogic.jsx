// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../../../context/StoryContext";
import { RoutesContext } from "../../../../../context/RoutesContext";

// Services
import getColourTint from "../../../../../services/GetColourTint";
import getColourWithTint from "../../../../../services/GetColourWithTint";

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
		let newCardStyles = {};
		if (character?.data?.colour) {
			newCardStyles["--characterColour"] = character.data.colour;
			newCardStyles["--characterColourTint"] = getColourTint(character.data.colour);

			const colours = getColourWithTint(character.data.colour);
			newCardStyles["--characterColourGradient1"] = colours[0];
			newCardStyles["--characterColourGradient2"] = colours[1];
		} else {
			newCardStyles["--characterColour"] = "#0044ff";
			newCardStyles["--characterColourTint"] = "#0044ff";
			newCardStyles["--characterColourGradient1"] = "#0044ff";
			newCardStyles["--characterColourGradient2"] = "#0044ff";
		}
		setCardStyles(newCardStyles);
	}, [character, setCardStyles]);

	return { characterType, navigateToCharacter, onCharacterCardMouseDown, cardStyles };
};
