// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../../UnitPageContext";

// Services

// Styles

// Assets

export const RelationshipChartCharacterItemLogic = ({ unit, index, characterRelationshipsChartWidth, characterRelationshipsChartItemWidth }) => {
	const { unit_uid, characterRelationshipsCharacters, selectedCharacterRelationshipsCharacterId, setSelectedCharacterRelationshipsCharacterId } =
		useContext(UnitPageContext);

	const [charactersRelationshipChartCharacterItemStyles, setUnitsRelationshipChartCharacterItemStyles] = useState({});
	useEffect(() => {
		function getCharactersRelationshipChartCharacterItemStyles() {
			let newCharactersRelationshipChartCharacterItemStyles = {};
			const angle = (index / characterRelationshipsCharacters.length) * Math.PI * 2;
			const adjacent = (characterRelationshipsChartWidth / 2 - characterRelationshipsChartItemWidth / 2) * Math.sin(angle);
			const opposite = -1 * (characterRelationshipsChartWidth / 2 - (characterRelationshipsChartItemWidth + 18) / 2) * Math.cos(angle);
			newCharactersRelationshipChartCharacterItemStyles.transform = "translate(" + adjacent + "px, " + opposite + "px)";

			if (unit?.data?.colour) newCharactersRelationshipChartCharacterItemStyles["--unitColour"] = unit?.data?.colour;
			setUnitsRelationshipChartCharacterItemStyles(newCharactersRelationshipChartCharacterItemStyles);
		}
		getCharactersRelationshipChartCharacterItemStyles();
	}, [
		setUnitsRelationshipChartCharacterItemStyles,
		characterRelationshipsCharacters,
		unit,
		index,
		characterRelationshipsChartWidth,
		characterRelationshipsChartItemWidth,
	]);

	function onClick(e) {
		e.stopPropagation();
		if (!unit?._id) return false;
		if (selectedCharacterRelationshipsCharacterId === unit?._id || unit_uid === unit?.uid)
			return setSelectedCharacterRelationshipsCharacterId(false);
		setSelectedCharacterRelationshipsCharacterId(unit._id);
	}

	return { unit_uid, charactersRelationshipChartCharacterItemStyles, selectedCharacterRelationshipsCharacterId, onClick };
};
