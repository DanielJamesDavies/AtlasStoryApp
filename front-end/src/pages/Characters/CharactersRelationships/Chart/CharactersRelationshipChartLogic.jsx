// Packages
import { useContext, useEffect } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../../CharactersContext";

// Services

// Styles

// Assets

export const CharactersRelationshipChartLogic = ({ charactersRelationshipChartWidth, charactersRelationshipChartItemWidth }) => {
	const {
		story,
		storyGroups,
		storyCharacters,
		storyCharacterRelationships,
		characterRelationshipsCharacters,
		selectedCharacterRelationshipsCharacterId,
		setSelectedCharacterRelationshipsCharacterId,
		relationshipsFilters,
	} = useContext(CharactersContext);

	function onClickChart() {
		setSelectedCharacterRelationshipsCharacterId(false);
	}

	useEffect(() => {
		function drawChartCanvas() {
			if (
				!storyGroups ||
				storyGroups?.length === 0 ||
				!storyCharacters ||
				storyCharacters?.length === 0 ||
				!storyCharacterRelationships ||
				storyCharacterRelationships?.length === 0 ||
				!relationshipsFilters
			)
				return false;

			const canvas = document.getElementById("characters-relationship-chart-canvas");
			if (!canvas) return false;

			const ctx = canvas.getContext("2d");
			canvas.width = canvas?.clientWidth;
			canvas.height = canvas?.clientHeight;

			ctx.lineCap = "round";
			ctx.lineWidth = 4;

			if (!characterRelationshipsCharacters) return null;

			const charactersOrder = characterRelationshipsCharacters.map((character) => character._id);

			const newCharacterRelationships = JSON.parse(JSON.stringify(storyCharacterRelationships))
				.filter(
					(e) =>
						e.character_ids.length === 2 &&
						charactersOrder.includes(e.character_ids[0]) &&
						charactersOrder.includes(e.character_ids[1]) &&
						relationshipsFilters.relationshipTypes.includes(e.relationship_type) &&
						!e?.isRemoved
				)
				.sort((a, b) =>
					story.data.characterRelationshipTypes.findIndex((e) => e._id === a.relationship_type) <=
					story.data.characterRelationshipTypes.findIndex((e) => e._id === b.relationship_type)
						? 1
						: -1
				);

			// Is Not Current
			newCharacterRelationships.map((relationship) => {
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
			newCharacterRelationships.map((relationship) => {
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
			const character_indexs = [
				charactersOrder.findIndex((e) => e === relationship.character_ids[0]),
				charactersOrder.findIndex((e) => e === relationship.character_ids[1]),
			].sort((a, b) => a - b);
			const character_1_index = character_indexs[0];
			const character_2_index = character_indexs[1];

			const angle1 = (character_1_index / charactersOrder.length) * Math.PI * 2;
			const adjacent1 = -1 * (charactersRelationshipChartWidth / 2 - charactersRelationshipChartItemWidth / 2) * Math.sin(angle1);
			const opposite1 = -1 * (charactersRelationshipChartWidth / 2 - (charactersRelationshipChartItemWidth + 18) / 2) * Math.cos(angle1);

			const angle2 = (character_2_index / charactersOrder.length) * Math.PI * 2;
			const adjacent2 = -1 * (charactersRelationshipChartWidth / 2 - charactersRelationshipChartItemWidth / 2) * Math.sin(angle2);
			const opposite2 = -1 * (charactersRelationshipChartWidth / 2 - (charactersRelationshipChartItemWidth + 18) / 2) * Math.cos(angle2);

			const x1 = canvas.width / 2 - adjacent1;
			const y1 = canvas.height / 2 - opposite1 * -1;
			const x2 = canvas.width / 2 - adjacent2;
			const y2 = canvas.height / 2 - opposite2 * -1;

			ctx.moveTo(x1, y1);

			ctx.bezierCurveTo(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2, x2, y2);
			ctx.stroke();
		}

		drawChartCanvas();
	}, [
		story,
		storyGroups,
		storyCharacters,
		storyCharacterRelationships,
		characterRelationshipsCharacters,
		selectedCharacterRelationshipsCharacterId,
		relationshipsFilters,
		charactersRelationshipChartWidth,
		charactersRelationshipChartItemWidth,
	]);

	return { storyCharacters, selectedCharacterRelationshipsCharacterId, characterRelationshipsCharacters, onClickChart };
};
