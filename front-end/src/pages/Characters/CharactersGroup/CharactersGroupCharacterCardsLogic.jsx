// Packages
import { useContext, useRef, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const CharactersGroupCharacterCardsLogic = () => {
	const { story, groups, setGroups, openGroup, characters, images, isReorderingCharacters } = useContext(CharactersContext);
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

	async function changeCharactersOrder(res) {
		let newStory = JSON.parse(JSON.stringify(story));
		let newGroups = JSON.parse(JSON.stringify(groups));
		let newOpenGroup = JSON.parse(JSON.stringify(openGroup));

		if (!newGroups[newOpenGroup]?.data?.characters) return;

		const tempCharacter = newGroups[newOpenGroup].data.characters.splice(res.from, 1)[0];
		newGroups[newOpenGroup].data.characters.splice(res.to, 0, tempCharacter);

		setGroups(newGroups);

		await APIRequest("/group/" + newGroups[newOpenGroup]._id, "PATCH", {
			story_id: newStory._id,
			path: ["data", "characters"],
			newValue: newGroups[newOpenGroup].data.characters,
		});
	}

	return { groups, openGroup, characters, images, charactersCards, scrollCharacterCards, isReorderingCharacters, changeCharactersOrder };
};
