// Packages
import { useContext, useRef, useState } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../StoryContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const StoryPrimaryCharacterCardsLogic = () => {
	const { story, primaryCharacters, setPrimaryCharacters, primaryCharactersCardBackgrounds, isReorderingCharacters } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

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
				characterCardsScrollValue !== 0 &&
				charactersCards?.current &&
				(charactersCards.current.scrollLeft !== 0 || characterCardsScrollValue > 0) &&
				(charactersCards.current.scrollLeft !== charactersCards.current.scrollWidth - charactersCards.current.clientWidth ||
					characterCardsScrollValue < 0)
			) {
				charactersCards.current.scrollLeft += characterCardsScrollValue * 3;
			} else {
				clearInterval(interval);
				setCharacterCardsScrollInterval(false);
			}
		}, 2);
		setCharacterCardsScrollInterval(interval);
	}

	// Reorder Characters
	async function changePrimaryCharactersOrder(res) {
		let newStory = JSON.parse(JSON.stringify(story));
		let newPrimaryCharacters = JSON.parse(JSON.stringify(primaryCharacters));

		if (res.from === undefined || res.to === undefined) return;

		const tempCharacter = newPrimaryCharacters.splice(res.from, 1)[0];
		newPrimaryCharacters.splice(res.to, 0, tempCharacter);

		setPrimaryCharacters(newPrimaryCharacters);

		newPrimaryCharacters = newPrimaryCharacters
			.map((primaryCharacter) => (primaryCharacter?._id ? primaryCharacter._id : false))
			.filter((e) => e !== false);

		await APIRequest("/story/" + newStory._id, "PATCH", {
			story_id: newStory._id,
			path: ["data", "primaryCharacters"],
			newValue: newPrimaryCharacters,
		});
	}

	function afterOnTouchMove(e) {
		if (e?.touches[0]?.clientX === undefined || e?.touches[0]?.clientY === undefined) return;
		const elementsOver = document.elementsFromPoint(e.touches[0].clientX, e.touches[0].clientY);

		clearInterval(characterCardsScrollInterval);
		setCharacterCardsScrollInterval(false);
		scrollCharacterCards(0);

		elementsOver.forEach((element) => {
			if (!element.classList || !Array.from(element.classList)) return;
			if (
				Array.from(element.classList).includes("story-primary-characters-cards-scroll-left") ||
				Array.from(element.classList).includes("story-primary-characters-cards-scroll-right")
			) {
				scrollCharacterCards(Array.from(element.classList).includes("story-primary-characters-cards-scroll-left") ? -0.75 : 0.75);
			}
		});
	}

	function afterOnTouchEnd() {
		scrollCharacterCards(0);
	}

	return {
		primaryCharacters,
		primaryCharactersCardBackgrounds,
		isReorderingCharacters,
		charactersCards,
		scrollCharacterCards,
		changePrimaryCharactersOrder,
		afterOnTouchMove,
		afterOnTouchEnd,
	};
};
