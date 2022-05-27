// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../context/RoutesContext";
import { APIContext } from "../../../context/APIContext";
import { StoryContext } from "../StoryContext";

// Services

// Styles

// Assets

export const StoryPrimaryCharacterCardLogic = ({ character }) => {
	const { changeLocation } = useContext(RoutesContext);
	const { APIRequest } = useContext(APIContext);
	const { story } = useContext(StoryContext);

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

	return {
		navigateToCharacter,
		cardStyles,
		cardTopNameStyles,
		cardInfoItemStyles,
		cardBackground,
	};
};
