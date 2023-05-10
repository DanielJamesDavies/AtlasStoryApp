// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic
import { CharacterContext } from "../../../../../../CharacterContext";

// Context

// Services

// Styles

// Assets

export const RelationshipItemLogic = ({ relationship, selectedCharacterRelationships }) => {
	const {
		story,
		storyGroups,
		character,
		storyCharacters,
		characterRelationships,
		setCharacterRelationships,
		setCharacterRelationshipsRemovedIds,
	} = useContext(CharacterContext);

	const [secondCharacter, setSecondCharacter] = useState(false);

	useEffect(() => {
		if (!character?._id) {
			setSecondCharacter(false);
		} else {
			const newSecondCharacter = storyCharacters.find((e) => e._id === relationship.character_ids.find((e) => e !== character?._id));
			setSecondCharacter(newSecondCharacter ? newSecondCharacter : false);
		}
	}, [setSecondCharacter, relationship, character, storyCharacters]);

	function changeRelationshipSecondCharacter(index) {
		const options = storyGroups
			.map((group) =>
				group?.data?.characters
					.filter(
						(character) =>
							selectedCharacterRelationships
								.filter((e) => !e?.isRemoved)
								.findIndex((relationship) => relationship.character_ids.includes(character?.character_id)) === -1
					)
					.map((character) => storyCharacters.find((e) => e._id === character?.character_id)?._id)
			)
			.flat(1)
			.filter((e) => e);

		let newCharacterRelationships = JSON.parse(JSON.stringify(characterRelationships));
		const relationshipIndex = newCharacterRelationships.findIndex((e) => e._id === relationship._id);

		if (relationshipIndex === -1) return false;

		const secondCharacterIndex = newCharacterRelationships[relationshipIndex].character_ids.findIndex((e) => e !== character?._id);
		if (secondCharacterIndex === -1) {
			newCharacterRelationships[relationshipIndex].character_ids.push(options[index]);
		} else {
			newCharacterRelationships[relationshipIndex].character_ids[secondCharacterIndex] = options[index];
		}

		setCharacterRelationships(newCharacterRelationships);
	}

	function changeRelationshipType(index) {
		let newCharacterRelationships = JSON.parse(JSON.stringify(characterRelationships));
		const relationshipIndex = newCharacterRelationships.findIndex((e) => e._id === relationship._id);
		if (relationshipIndex === -1) return false;
		newCharacterRelationships[relationshipIndex].relationship_type = story?.data?.characterRelationshipTypes[index]._id;
		setCharacterRelationships(newCharacterRelationships);
	}

	function removeRelationship() {
		let newCharacterRelationships = JSON.parse(JSON.stringify(characterRelationships));
		const relationshipIndex = newCharacterRelationships.findIndex((e) => e._id === relationship._id);
		if (relationshipIndex === -1) return false;
		newCharacterRelationships[relationshipIndex].isRemoved = true;

		setCharacterRelationshipsRemovedIds((oldCharacterRelationshipsRemovedIds) => {
			let newCharacterRelationshipsRemovedIds = JSON.parse(JSON.stringify(oldCharacterRelationshipsRemovedIds));
			const removedIndex = newCharacterRelationshipsRemovedIds.findIndex((e) => e === newCharacterRelationships[relationshipIndex]._id);
			if (removedIndex !== -1) return newCharacterRelationshipsRemovedIds;
			newCharacterRelationshipsRemovedIds.push(newCharacterRelationships[relationshipIndex]._id);
			return newCharacterRelationshipsRemovedIds;
		});

		setCharacterRelationships(newCharacterRelationships);
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
