// Packages
import { useContext, useRef, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";

// Services

// Styles

// Assets

export const CharactersGroupCharacterCardsLogic = () => {
	const { groups, openGroup } = useContext(CharactersContext);

	// Character Cards Scroll
	const charactersCards = useRef();
	const [characterCardsScrollInterval, setCharacterCardsScrollInterval] = useState(false);

	function scrollCharacterCards(characterCardsScrollValue) {
		if (!charactersCards?.current || characterCardsScrollValue === 0) {
			clearInterval(characterCardsScrollInterval);
			setCharacterCardsScrollInterval(false);
			return;
		}
		var interval = setInterval(() => {
			if (
				charactersCards?.current &&
				(charactersCards.scrollLeft !== 0 || characterCardsScrollValue > 0) &&
				characterCardsScrollValue !== 0
			) {
				charactersCards.current.scrollLeft += characterCardsScrollValue * 3;
			} else {
				clearInterval(interval);
				setCharacterCardsScrollInterval(false);
			}
		}, 2);
		setCharacterCardsScrollInterval(interval);
	}

	return { groups, openGroup, charactersCards, scrollCharacterCards };
};
