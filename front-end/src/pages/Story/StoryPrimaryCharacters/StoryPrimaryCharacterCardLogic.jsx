// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../context/RoutesContext";
import { StoryContext } from "../StoryContext";

// Services

// Styles

// Assets

export const StoryPrimaryCharacterCardLogic = ({ character }) => {
	const { changeLocation } = useContext(RoutesContext);
	const { story, primaryCharactersCardBackgrounds, characterTypes } = useContext(StoryContext);

	const [cardBackground, setCardBackground] = useState(false);
	const [characterType, setCharacterType] = useState(false);

	useEffect(() => {
		const newCardBackground = primaryCharactersCardBackgrounds?.find((e) => e._id === character?.data?.cardBackground)?.image;
		setCardBackground(newCardBackground === undefined ? false : newCardBackground);

		const newCharacterType = characterTypes?.find((e) => e._id === character?.character_type_id);
		setCharacterType(newCharacterType === undefined ? false : newCharacterType);
	}, [character, primaryCharactersCardBackgrounds, characterTypes, setCardBackground, setCharacterType]);

	function navigateToCharacter(e) {
		if (story?.uid && character?.uid) changeLocation("/s/" + story.uid + "/c/" + character.uid, e.button === 1);
	}

	function onCharacterCardMouseDown(e) {
		if (e.button === 1) e.preventDefault();
	}

	// Character Colour Styles
	const [cardStyles, setCardStyles] = useState({});
	const [topNameStyles, setTopNameStyles] = useState({});
	const [infoItemStyles, setInfoItemStyles] = useState({});

	useEffect(() => {
		setCardStyles(character?.data?.colour ? { borderColor: character.data.colour } : {});
		setTopNameStyles(character?.data?.colour ? { color: character.data.colour } : {});
		setInfoItemStyles(character?.data?.colour ? { background: character.data.colour } : {});
	}, [character, setCardStyles, setTopNameStyles, setInfoItemStyles]);

	return { cardBackground, characterType, navigateToCharacter, onCharacterCardMouseDown, cardStyles, topNameStyles, infoItemStyles };
};
