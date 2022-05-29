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
	const { story, groups, setGroups, group, changeGroup, characters, images, isReorderingCharacters } = useContext(CharactersContext);
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
		const openGroup = newGroups.findIndex((e) => e._id === group._id);

		if (openGroup === -1) return;
		if (!newGroups[openGroup]?.data?.characters) return;
		if (res.from === undefined || res.to === undefined) return;

		const tempCharacter = newGroups[openGroup].data.characters.splice(res.from, 1)[0];
		newGroups[openGroup].data.characters.splice(res.to, 0, tempCharacter);

		setGroups(newGroups);
		changeGroup(newGroups[openGroup]._id, newGroups);

		await APIRequest("/group/" + newGroups[openGroup]._id, "PATCH", {
			story_id: newStory._id,
			path: ["data", "characters"],
			newValue: newGroups[openGroup].data.characters,
		});
	}

	return { groups, group, characters, images, charactersCards, scrollCharacterCards, isReorderingCharacters, changeCharactersOrder };
};
