// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../context/RoutesContext";
import { CharactersContext } from "./CharactersContext";

// Services

// Styles

// Assets

export const CharactersGroupCharacterCardLogic = ({ character }) => {
	const { changeLocation } = useContext(RoutesContext);
	const { story } = useContext(CharactersContext);

	function navigateToCharacter() {
		if (story?.url && character?.url) changeLocation("s/" + story.url + "/c/" + character.url);
	}

	const [cardStyles, setCardStyles] = useState({});
	const [topNameStyles, setTopNameStyles] = useState({});
	const [infoItemStyles, setInfoItemStyles] = useState({});

	useEffect(() => {
		setCardStyles(character?.data?.colour ? { borderColor: character.data.colour } : {});
		setTopNameStyles(character?.data?.colour ? { color: character.data.colour } : {});
		setInfoItemStyles(character?.data?.colour ? { background: character.data.colour } : {});
	}, [character, setCardStyles]);

	return { navigateToCharacter, cardStyles, topNameStyles, infoItemStyles };
};
