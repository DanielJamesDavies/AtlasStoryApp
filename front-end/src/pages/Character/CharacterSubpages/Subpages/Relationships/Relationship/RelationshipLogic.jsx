// Packages
import { useContext, useRef, useEffect, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";

// Services

// Styles

// Assets

export const RelationshipLogic = () => {
	const { character, characterRelationships, selectedCharacterRelationshipsCharacterId } = useContext(CharacterContext);
	const relationshipRef = useRef();

	useEffect(() => {
		const relationshipRefCurrent = relationshipRef?.current;
		const onWheel = (e) => (relationshipRefCurrent?.scrollTop !== 0 ? e.stopPropagation() : null);
		if (relationshipRefCurrent) relationshipRefCurrent.addEventListener("wheel", onWheel);
		return () => (relationshipRefCurrent ? relationshipRefCurrent.removeEventListener("wheel", onWheel) : null);
	}, [relationshipRef]);

	const [relationship, setRelationship] = useState(false);
	const [relationshipCharacterIndex, setRelationshipCharacterIndex] = useState(false);
	useEffect(() => {
		function getRelationship() {
			if (!characterRelationships || !character?._id || !selectedCharacterRelationshipsCharacterId) return false;
			let newRelationship = characterRelationships.find(
				(e) => e.character_ids.includes(character._id) && e.character_ids.includes(selectedCharacterRelationshipsCharacterId)
			);
			setRelationship(newRelationship);
			setRelationshipCharacterIndex(newRelationship.character_ids.findIndex((e) => e === character._id));
		}
		getRelationship();
	}, [setRelationship, setRelationshipCharacterIndex, character, characterRelationships, selectedCharacterRelationshipsCharacterId]);

	return { relationshipRef, relationship, setRelationship, relationshipCharacterIndex };
};