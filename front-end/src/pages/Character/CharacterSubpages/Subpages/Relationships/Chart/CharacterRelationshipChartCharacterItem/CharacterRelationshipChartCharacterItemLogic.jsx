// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../../CharacterContext";

// Services

// Styles

// Assets

export const CharacterRelationshipChartCharacterItemLogic = ({
	character,
	index,
	characterRelationshipsChartWidth,
	characterRelationshipsChartItemWidth,
}) => {
	const {
		character_uid,
		characterRelationshipsCharacters,
		selectedCharacterRelationshipsCharacterId,
		setSelectedCharacterRelationshipsCharacterId,
	} = useContext(CharacterContext);

	const [charactersRelationshipChartCharacterItemStyles, setCharactersRelationshipChartCharacterItemStyles] = useState({});
	useEffect(() => {
		function getCharactersRelationshipChartCharacterItemStyles() {
			let newCharactersRelationshipChartCharacterItemStyles = {};
			const angle = (index / characterRelationshipsCharacters.length) * Math.PI * 2;
			const adjacent = (characterRelationshipsChartWidth / 2 - characterRelationshipsChartItemWidth / 2) * Math.sin(angle);
			const opposite = -1 * (characterRelationshipsChartWidth / 2 - (characterRelationshipsChartItemWidth + 18) / 2) * Math.cos(angle);
			newCharactersRelationshipChartCharacterItemStyles.transform = "translate(" + adjacent + "px, " + opposite + "px)";

			if (character?.data?.colour) newCharactersRelationshipChartCharacterItemStyles["--characterColour"] = character?.data?.colour;
			setCharactersRelationshipChartCharacterItemStyles(newCharactersRelationshipChartCharacterItemStyles);
		}
		getCharactersRelationshipChartCharacterItemStyles();
	}, [
		setCharactersRelationshipChartCharacterItemStyles,
		characterRelationshipsCharacters,
		character,
		index,
		characterRelationshipsChartWidth,
		characterRelationshipsChartItemWidth,
	]);

	function onClick(e) {
		e.stopPropagation();
		if (!character?._id) return false;
		if (selectedCharacterRelationshipsCharacterId === character?._id || character_uid === character?.uid)
			return setSelectedCharacterRelationshipsCharacterId(false);
		setSelectedCharacterRelationshipsCharacterId(character._id);
	}

	return { character_uid, charactersRelationshipChartCharacterItemStyles, selectedCharacterRelationshipsCharacterId, onClick };
};
