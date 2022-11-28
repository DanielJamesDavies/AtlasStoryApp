// Packages
import { useContext, useEffect } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";

// Services

// Styles

// Assets

export const CharactersRelationshipChartLogic = () => {
	const {
		story,
		groups,
		characters,
		characterRelationships,
		charactersFaceImages,
		selectedCharacterRelationshipsCharacterId,
		setSelectedCharacterRelationshipsCharacterId,
	} = useContext(CharactersContext);

	useEffect(() => {
		function drawChartCanvas() {
			if (
				!groups ||
				groups?.length === 0 ||
				!characters ||
				characters?.length === 0 ||
				!characterRelationships ||
				characterRelationships?.length === 0
			)
				return false;

			const canvas = document.getElementById("characters-relationship-chart-canvas");
			const ctx = canvas.getContext("2d");
			canvas.width = canvas?.clientWidth;
			canvas.height = canvas?.clientHeight;

			ctx.lineCap = "round";
			ctx.lineWidth = 4;

			const charactersOrder = groups
				.map((group) =>
					group?.data?.characters.map((character) => {
						let newCharacter = characters.find((e) => e?._id === character?.character_id);
						if (!newCharacter) return false;
						return newCharacter._id;
					})
				)
				.flat(1)
				.filter((e) => e !== false);

			// Is Not Current
			JSON.parse(JSON.stringify(characterRelationships))
				.reverse()
				.map((relationship) => {
					if (
						selectedCharacterRelationshipsCharacterId !== false &&
						relationship.character_ids.findIndex((e) => e === selectedCharacterRelationshipsCharacterId) === -1
					) {
						drawRelationshipCurve(relationship, false, canvas, ctx, charactersOrder);
						return true;
					} else {
						return false;
					}
				});

			// Is Current
			JSON.parse(JSON.stringify(characterRelationships))
				.reverse()
				.map((relationship) => {
					if (
						selectedCharacterRelationshipsCharacterId !== false &&
						relationship.character_ids.findIndex((e) => e === selectedCharacterRelationshipsCharacterId) === -1
					) {
						return false;
					} else {
						drawRelationshipCurve(relationship, true, canvas, ctx, charactersOrder);
						return true;
					}
				});
		}

		function drawRelationshipCurve(relationship, isCurrent, canvas, ctx, charactersOrder) {
			ctx.beginPath();
			const relationshipType = story?.data?.characterRelationshipTypes.find((e) => e._id === relationship.relationship_type);
			if (relationshipType?.colour) {
				ctx.strokeStyle = relationshipType?.colour;
			} else {
				ctx.strokeStyle = "#0044ff";
			}
			if (!isCurrent) ctx.strokeStyle += "22";
			const character_1_index = charactersOrder.findIndex((e) => e === relationship.character_ids[0]);
			const character_2_index = charactersOrder.findIndex((e) => e === relationship.character_ids[1]);

			const angle1 = (character_1_index / charactersOrder.length) * Math.PI * 2;
			const adjacent1 = -1 * (850 / 2 - (72 + 6) / 2) * Math.sin(angle1);
			const opposite1 = -1 * (850 / 2 - (72 + 6 + 18) / 2) * Math.cos(angle1);

			const angle2 = (character_2_index / charactersOrder.length) * Math.PI * 2;
			const adjacent2 = -1 * (850 / 2 - (72 + 6) / 2) * Math.sin(angle2);
			const opposite2 = -1 * (850 / 2 - (72 + 6 + 18) / 2) * Math.cos(angle2);

			const x1 = canvas.width / 2 - adjacent1;
			const y1 = canvas.height / 2 - opposite1 * -1;
			const x2 = canvas.width / 2 - adjacent2;
			const y2 = canvas.height / 2 - opposite2 * -1;

			ctx.moveTo(x1, y1);

			const mathSign = Math.sign((character_2_index / charactersOrder.length - 0.5) * -1);
			ctx.bezierCurveTo(
				canvas.width / 2 + -50 * mathSign,
				canvas.height / 2 + -50 * mathSign,
				canvas.width / 2 + 50 * mathSign,
				canvas.height / 2 + 50 * mathSign,
				x2,
				y2
			);
			ctx.stroke();
		}

		drawChartCanvas();
	}, [groups, characters, characterRelationships, selectedCharacterRelationshipsCharacterId]);

	function onClickChart() {
		setSelectedCharacterRelationshipsCharacterId(false);
	}

	return { groups, characters, charactersFaceImages, onClickChart };
};
