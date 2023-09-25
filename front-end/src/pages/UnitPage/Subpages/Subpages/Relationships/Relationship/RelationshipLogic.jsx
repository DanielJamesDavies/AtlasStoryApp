// Packages
import { useContext, useRef, useEffect, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";

// Services

// Styles

// Assets

export const RelationshipLogic = () => {
	const { unit, characterRelationships, setCharacterRelationships, selectedCharacterRelationshipsCharacterId } = useContext(UnitPageContext);
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
			if (!characterRelationships || !unit?._id || !selectedCharacterRelationshipsCharacterId) return false;
			let newRelationship = characterRelationships.find(
				(e) => e.character_ids.includes(unit._id) && e.character_ids.includes(selectedCharacterRelationshipsCharacterId)
			);
			setRelationship(newRelationship);
			setRelationshipCharacterIndex(newRelationship.character_ids.findIndex((e) => e === unit._id) + 1);
		}
		getRelationship();
	}, [setRelationship, setRelationshipCharacterIndex, unit, characterRelationships, selectedCharacterRelationshipsCharacterId]);

	function changeRelationship(newRelationship) {
		setRelationship(newRelationship);
		let newRelationships = JSON.parse(JSON.stringify(characterRelationships));
		const index = newRelationships.findIndex((e) => e._id === newRelationship._id);
		if (index === -1) return false;
		newRelationships[index] = newRelationship;
		setCharacterRelationships(newRelationships);
	}

	return { relationshipRef, relationship, changeRelationship, relationshipCharacterIndex };
};
