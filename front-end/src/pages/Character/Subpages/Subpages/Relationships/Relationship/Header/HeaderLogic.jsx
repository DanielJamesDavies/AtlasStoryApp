// Packages
import { useContext, useRef, useEffect, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../../CharacterContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const HeaderLogic = ({ relationship, changeRelationship }) => {
	const { isAuthorizedToEdit, story, character, storyCharacters, selectedCharacterRelationshipsCharacterId } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	const [secondCharacter, setSecondCharacter] = useState(false);
	useEffect(() => {
		function getSecondCharacter() {
			if (!storyCharacters || !selectedCharacterRelationshipsCharacterId) return false;
			let newSecondCharacter = storyCharacters.find((e) => e._id === selectedCharacterRelationshipsCharacterId);
			setSecondCharacter(newSecondCharacter);
		}
		getSecondCharacter();
	}, [setSecondCharacter, selectedCharacterRelationshipsCharacterId, storyCharacters]);

	const headerRef = useRef();

	useEffect(() => {
		const headerRefCurrent = headerRef?.current;
		const onWheel = (e) => (headerRefCurrent?.scrollTop !== 0 ? e.stopPropagation() : null);
		if (headerRefCurrent) headerRefCurrent.addEventListener("wheel", onWheel);
		return () => (headerRefCurrent ? headerRefCurrent.removeEventListener("wheel", onWheel) : null);
	}, [headerRef]);

	function changeRelationshipType(index) {
		let newRelationship = JSON.parse(JSON.stringify(relationship));
		newRelationship.relationship_type = story?.data?.characterRelationshipTypes[index]._id;
		changeRelationship(newRelationship);
	}

	async function saveRelationshipType() {
		const response = await APIRequest("/character-relationship/" + relationship._id, "PATCH", {
			story_id: story._id,
			path: ["relationship_type"],
			newValue: relationship.relationship_type,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	async function revertRelationshipType() {
		const response = await APIRequest("/character-relationship/get-value/" + relationship._id, "POST", {
			story_id: story._id,
			path: ["relationship_type"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newRelationship = JSON.parse(JSON.stringify(relationship));
		newRelationship.relationship_type = response.data.value;
		changeRelationship(newRelationship);
		return true;
	}

	return {
		isAuthorizedToEdit,
		headerRef,
		story,
		character,
		secondCharacter,
		changeRelationshipType,
		saveRelationshipType,
		revertRelationshipType,
	};
};
