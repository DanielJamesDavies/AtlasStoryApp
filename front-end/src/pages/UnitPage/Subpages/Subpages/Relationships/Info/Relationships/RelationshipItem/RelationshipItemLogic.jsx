// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic
import { UnitPageContext } from "../../../../../../UnitPageContext";

// Context

// Services

// Styles

// Assets

export const RelationshipItemLogic = ({ relationship, selectedRelationships }) => {
	const { story, storyGroups, unit, storyCharacters, characterRelationships, setCharacterRelationships, setCharacterRelationshipsRemovedIds } =
		useContext(UnitPageContext);

	const [secondCharacter, setSecondCharacter] = useState(false);

	useEffect(() => {
		if (!unit?._id) {
			setSecondCharacter(false);
		} else {
			const newSecondCharacter = storyCharacters.find((e) => e._id === relationship.character_ids.find((e) => e !== unit?._id));
			setSecondCharacter(newSecondCharacter ? newSecondCharacter : false);
		}
	}, [setSecondCharacter, relationship, unit, storyCharacters]);

	function changeRelationshipSecondCharacter(index) {
		const options = storyGroups
			.map((group) =>
				group?.data?.characters
					.filter(
						(character) =>
							selectedRelationships
								.filter((e) => !e?.isRemoved)
								.findIndex((relationship) => relationship.character_ids.includes(unit?.character_id)) === -1
					)
					.map((character) => storyCharacters.find((e) => e._id === unit?.character_id)?._id)
			)
			.flat(1)
			.filter((e) => e);

		let newRelationships = JSON.parse(JSON.stringify(characterRelationships));
		const relationshipIndex = newRelationships.findIndex((e) => e._id === relationship._id);

		if (relationshipIndex === -1) return false;

		const secondCharacterIndex = newRelationships[relationshipIndex].character_ids.findIndex((e) => e !== unit?._id);
		if (secondCharacterIndex === -1) {
			newRelationships[relationshipIndex].character_ids.push(options[index]);
		} else {
			newRelationships[relationshipIndex].character_ids[secondCharacterIndex] = options[index];
		}

		setCharacterRelationships(newRelationships);
	}

	function changeRelationshipType(index) {
		let newRelationships = JSON.parse(JSON.stringify(characterRelationships));
		const relationshipIndex = newRelationships.findIndex((e) => e._id === relationship._id);
		if (relationshipIndex === -1) return false;
		newRelationships[relationshipIndex].relationship_type = story?.data?.characterRelationshipTypes[index]._id;
		setCharacterRelationships(newRelationships);
	}

	function removeRelationship() {
		let newRelationships = JSON.parse(JSON.stringify(characterRelationships));
		const relationshipIndex = newRelationships.findIndex((e) => e._id === relationship._id);
		if (relationshipIndex === -1) return false;
		newRelationships[relationshipIndex].isRemoved = true;

		setCharacterRelationshipsRemovedIds((oldRelationshipsRemovedIds) => {
			let newRelationshipsRemovedIds = JSON.parse(JSON.stringify(oldRelationshipsRemovedIds));
			const removedIndex = newRelationshipsRemovedIds.findIndex((e) => e === newRelationships[relationshipIndex]._id);
			if (removedIndex !== -1) return newRelationshipsRemovedIds;
			newRelationshipsRemovedIds.push(newRelationships[relationshipIndex]._id);
			return newRelationshipsRemovedIds;
		});

		setCharacterRelationships(newRelationships);
	}

	return {
		story,
		storyGroups,
		storyCharacters,
		secondCharacter,
		changeRelationshipSecondCharacter,
		changeRelationshipType,
		removeRelationship,
	};
};
