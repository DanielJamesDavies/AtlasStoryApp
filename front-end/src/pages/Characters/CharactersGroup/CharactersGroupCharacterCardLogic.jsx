// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../context/RoutesContext";
import { APIContext } from "../../../context/APIContext";
import { CharactersContext } from "../CharactersContext";

// Services

// Styles

// Assets

export const CharactersGroupCharacterCardLogic = ({ character }) => {
	const { changeLocation } = useContext(RoutesContext);
	const { APIRequest } = useContext(APIContext);
	const { story } = useContext(CharactersContext);

	function navigateToCharacter() {
		if (story?.url && character?.url) changeLocation("s/" + story.url + "/c/" + character.url);
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

	// Card Background
	const [cardBackground, setCardBackground] = useState(false);

	useEffect(() => {
		async function getCardBackground() {
			if (!character?.data?.cardBackground) return;

			const response = await APIRequest("/image/" + character.data.cardBackground, "GET");
			if (!response?.data?.image || response?.error) return setCardBackground(false);
			setCardBackground(response.data.image);
		}
		getCardBackground();
	}, [character, APIRequest, setCardBackground]);

	return { navigateToCharacter, cardStyles, topNameStyles, infoItemStyles, cardBackground };
};
