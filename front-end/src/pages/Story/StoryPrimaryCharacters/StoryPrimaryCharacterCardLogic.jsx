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

	function navigateToCharacter() {
		changeLocation("s/" + story.url + "/c/" + character.url);
	}

	// Character Colour Styles
	const [cardStyles, setCardStyles] = useState({});
	const [cardTopNameStyles, setCardTopNameStyles] = useState({});
	const [cardInfoItemStyles, setCardInfoItemStyles] = useState({});

	useEffect(() => {
		setCardStyles(character?.data?.colour ? { borderColor: character.data.colour } : {});
		setCardTopNameStyles(character?.data?.colour ? { color: character.data.colour } : {});
		setCardInfoItemStyles(character?.data?.colour ? { background: character.data.colour } : {});
	}, [character, setCardStyles, setCardTopNameStyles, setCardInfoItemStyles]);

	return { cardBackground, characterType, navigateToCharacter, cardStyles, cardTopNameStyles, cardInfoItemStyles };
};
