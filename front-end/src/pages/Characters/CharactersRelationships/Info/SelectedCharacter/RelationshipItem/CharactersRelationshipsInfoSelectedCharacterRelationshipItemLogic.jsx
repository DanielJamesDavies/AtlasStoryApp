// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic
import { CharactersContext } from "../../../../CharactersContext";

// Context

// Services

// Styles

// Assets

export const CharactersRelationshipsInfoSelectedCharacterRelationshipItemLogic = ({ relationship }) => {
	const {
		story,
		groups,
		characters,
		selectedCharacterRelationshipsCharacterId,
		characterRelationships,
		setCharacterRelationships,
		setCharacterRelationshipsRemovedIds,
	} = useContext(CharactersContext);

	const [secondCharacter, setSecondCharacter] = useState(false);

	useEffect(() => {
		if (!selectedCharacterRelationshipsCharacterId) {
			setSecondCharacter(false);
		} else {
			const newSecondCharacter = characters.find(
				(e) => e._id === relationship.character_ids.find((e) => e !== selectedCharacterRelationshipsCharacterId)
			);
			setSecondCharacter(newSecondCharacter ? newSecondCharacter : false);
		}
	}, [setSecondCharacter, relationship, selectedCharacterRelationshipsCharacterId, characters]);

	function changeRelationshipSecondCharacter(index) {
		const options = groups
			.map((group) =>
				group?.data?.characters
					.filter((character) => character.character_id !== selectedCharacterRelationshipsCharacterId)
					.map((character) => characters.find((e) => e._id === character?.character_id)?._id)
			)
			.flat(1)
			.filter((e) => e);

		let newCharacterRelationships = JSON.parse(JSON.stringify(characterRelationships));
		const relationshipIndex = newCharacterRelationships.findIndex((e) => e._id === relationship._id);

		if (relationshipIndex === -1) return false;

		const secondCharacterIndex = newCharacterRelationships[relationshipIndex].character_ids.findIndex(
			(e) => e !== selectedCharacterRelationshipsCharacterId
		);
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
		groups,
		characters,
		selectedCharacterRelationshipsCharacterId,
		secondCharacter,
		changeRelationshipSecondCharacter,
		changeRelationshipType,
		removeRelationship,
	};
};
