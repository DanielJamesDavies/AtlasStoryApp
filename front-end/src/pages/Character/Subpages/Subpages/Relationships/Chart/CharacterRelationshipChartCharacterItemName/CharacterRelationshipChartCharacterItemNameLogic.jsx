// Packages
import { useContext, useLayoutEffect, useRef, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../../CharacterContext";

// Services

// Styles

// Assets

export const CharacterRelationshipChartCharacterItemNameLogic = ({
	character,
	index,
	characterRelationshipsChartWidth,
	characterRelationshipsChartItemWidth,
}) => {
	const { characterRelationshipsCharacters, selectedCharacterRelationshipsCharacterId } = useContext(CharacterContext);

	const charactersRelationshipChartCharacterItemNameRef = useRef();
	const [charactersRelationshipChartCharacterItemNameStyles, setCharactersRelationshipChartCharacterItemNameStyles] = useState({});
	useLayoutEffect(() => {
		function getCharactersRelationshipChartCharacterItemNameStyles() {
			let newCharactersRelationshipChartCharacterItemNameStyles = {};

			const angle = (index / characterRelationshipsCharacters.length) * Math.PI * 2;
			const adjacent = (characterRelationshipsChartWidth / 2 + (characterRelationshipsChartItemWidth + 50) / 2) * Math.sin(angle);
			const opposite =
				-1 *
				(characterRelationshipsChartWidth / 2 +
					(charactersRelationshipChartCharacterItemNameRef?.current?.clientHeight
						? charactersRelationshipChartCharacterItemNameRef?.current?.clientHeight +
						  (index < characterRelationshipsCharacters.length * 0.25 || index > characterRelationshipsCharacters.length * 0.75
								? 12
								: 0)
						: 16) /
						2) *
				Math.cos(angle);
			newCharactersRelationshipChartCharacterItemNameStyles.transform = "translate(" + adjacent + "px, " + opposite + "px)";

			if (index === 0) {
				// Top
				newCharactersRelationshipChartCharacterItemNameStyles.textAlign = "center";
				newCharactersRelationshipChartCharacterItemNameStyles.transform = "translate(" + adjacent + "px, " + opposite + "px)";
			} else if (index === characterRelationshipsCharacters.length * 0.5) {
				// Bottom
				newCharactersRelationshipChartCharacterItemNameStyles.textAlign = "center";
				newCharactersRelationshipChartCharacterItemNameStyles.transform = "translate(" + adjacent + "px, " + opposite + "px)";
			} else if (index === 1) {
				// Top Right 1
				newCharactersRelationshipChartCharacterItemNameStyles.textAlign = "left";
				newCharactersRelationshipChartCharacterItemNameStyles.transform = "translate(" + adjacent * 1.15 + "px, " + (opposite + 7) + "px)";
			} else if (index === characterRelationshipsCharacters.length - 1) {
				// Top Left 1
				newCharactersRelationshipChartCharacterItemNameStyles.textAlign = "right";
				newCharactersRelationshipChartCharacterItemNameStyles.transform = "translate(" + adjacent * 1.15 + "px, " + (opposite + 7) + "px)";
			} else if (index === 2) {
				// Top Right 2
				newCharactersRelationshipChartCharacterItemNameStyles.textAlign = "left";
				newCharactersRelationshipChartCharacterItemNameStyles.transform = "translate(" + adjacent * 1.12 + "px, " + (opposite + 6) + "px)";
			} else if (index === characterRelationshipsCharacters.length - 2) {
				// Top Left 2
				newCharactersRelationshipChartCharacterItemNameStyles.textAlign = "right";
				newCharactersRelationshipChartCharacterItemNameStyles.transform = "translate(" + adjacent * 1.12 + "px, " + (opposite + 6) + "px)";
			} else if (index + 1 === characterRelationshipsCharacters.length * 0.5) {
				// Bottom Left 1
				newCharactersRelationshipChartCharacterItemNameStyles.textAlign = "left";
				newCharactersRelationshipChartCharacterItemNameStyles.transform = "translate(" + adjacent * 1.2 + "px, " + (opposite - 8) + "px)";
			} else if (index - 1 === characterRelationshipsCharacters.length * 0.5) {
				// Bottom Right 1
				newCharactersRelationshipChartCharacterItemNameStyles.textAlign = "right";
				newCharactersRelationshipChartCharacterItemNameStyles.transform = "translate(" + adjacent * 1.2 + "px, " + (opposite - 8) + "px)";
			} else if (index + 2 === characterRelationshipsCharacters.length * 0.5) {
				// Bottom Left 2
				newCharactersRelationshipChartCharacterItemNameStyles.textAlign = "left";
				newCharactersRelationshipChartCharacterItemNameStyles.transform = "translate(" + adjacent * 1.12 + "px, " + (opposite - 4) + "px)";
			} else if (index - 2 === characterRelationshipsCharacters.length * 0.5) {
				// Bottom Right 2
				newCharactersRelationshipChartCharacterItemNameStyles.textAlign = "right";
				newCharactersRelationshipChartCharacterItemNameStyles.transform = "translate(" + adjacent * 1.12 + "px, " + (opposite - 4) + "px)";
			} else if (index < characterRelationshipsCharacters.length * 0.5) {
				// Left
				newCharactersRelationshipChartCharacterItemNameStyles.transform = "translate(" + adjacent + "px, " + opposite + "px)";
				newCharactersRelationshipChartCharacterItemNameStyles.textAlign = "left";
			} else if (index > characterRelationshipsCharacters.length * 0.5) {
				// Right
				newCharactersRelationshipChartCharacterItemNameStyles.transform = "translate(" + adjacent + "px, " + opposite + "px)";
				newCharactersRelationshipChartCharacterItemNameStyles.textAlign = "right";
			}

			if (characterRelationshipsCharacters.length > 20) {
				newCharactersRelationshipChartCharacterItemNameStyles.fontSize = "12px";
			} else if (characterRelationshipsCharacters.length > 10) {
				newCharactersRelationshipChartCharacterItemNameStyles.fontSize = "13px";
			} else {
				newCharactersRelationshipChartCharacterItemNameStyles.fontSize = "14px";
				newCharactersRelationshipChartCharacterItemNameStyles.fontWeight = "700";
			}

			setCharactersRelationshipChartCharacterItemNameStyles(newCharactersRelationshipChartCharacterItemNameStyles);
		}
		getCharactersRelationshipChartCharacterItemNameStyles();
	}, [
		setCharactersRelationshipChartCharacterItemNameStyles,
		charactersRelationshipChartCharacterItemNameRef,
		characterRelationshipsCharacters,
		character,
		index,
		characterRelationshipsChartWidth,
		characterRelationshipsChartItemWidth,
	]);

	return {
		selectedCharacterRelationshipsCharacterId,
		charactersRelationshipChartCharacterItemNameRef,
		charactersRelationshipChartCharacterItemNameStyles,
	};
};
