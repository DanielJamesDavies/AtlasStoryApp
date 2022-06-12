// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../context/RoutesContext";
import { CharactersContext } from "../CharactersContext";

// Services

// Styles

// Assets

export const CharactersGroupCharacterCardLogic = ({ characterID }) => {
	const { changeLocation } = useContext(RoutesContext);
	const { story, characters, characterTypes, charactersCardBackgrounds } = useContext(CharactersContext);

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

	function navigateToCharacter() {
		if (story?.uid && character?.uid) changeLocation("s/" + story.uid + "/c/" + character.uid);
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

	return { character, cardBackground, characterType, navigateToCharacter, cardStyles, topNameStyles, infoItemStyles };
};
