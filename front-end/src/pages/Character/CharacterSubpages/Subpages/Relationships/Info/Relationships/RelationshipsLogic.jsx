// Packages
import { useContext, useEffect, useState, useRef } from "react";

// Components

// Logic
import { CharacterContext } from "../../../../../CharacterContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Context

// Services

// Styles

// Assets

export const RelationshipsLogic = () => {
	const {
		isAuthorizedToEdit,
		story,
		character,
		storyCharacters,
		characterRelationships,
		setCharacterRelationships,
		characterRelationshipsAddedIds,
		setCharacterRelationshipsAddedIds,
		characterRelationshipsRemovedIds,
		setCharacterRelationshipsRemovedIds,
	} = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	const [selectedCharacter, setSelectedCharacter] = useState(false);
	const [selectedCharacterRelationships, setSelectedCharacterRelationships] = useState(false);

	useEffect(() => {
		if (!character?._id) {
			setSelectedCharacter(false);
			setSelectedCharacterRelationships(false);
		} else {
			const newSelectedCharacter = storyCharacters.find((e) => e._id === character?._id);
			setSelectedCharacter(newSelectedCharacter ? newSelectedCharacter : false);

			const newSelectedCharacterRelationships = characterRelationships
				.filter((e) => e.character_ids.includes(character?._id))
				.sort((a, b) =>
					story?.data?.characterRelationshipTypes.findIndex((e) => e?._id === a?.relationship_type) >=
					story?.data?.characterRelationshipTypes.findIndex((e) => e?._id === b?.relationship_type)
						? 1
						: -1
				);
			setSelectedCharacterRelationships(newSelectedCharacterRelationships);
		}
	}, [setSelectedCharacter, character, story, storyCharacters, characterRelationships]);

	async function revertRelationships() {
		if (!story?._id) return false;

		const character_id = JSON.parse(JSON.stringify(character?._id));

		const character_relationships_response = await APIRequest("/character-relationship?story_id=" + story._id, "GET");
		if (
			!character_relationships_response ||
			character_relationships_response?.errors ||
			!character_relationships_response?.data?.characterRelationships
		)
			return false;

		const newCharacterRelationships = character_relationships_response.data.characterRelationships.map((relationship) => {
			const oldRelationship = characterRelationships.find((e) => e._id === relationship._id);
			if (oldRelationship && !relationship.character_ids.includes(character_id)) return oldRelationship;
			return relationship;
		});

		setCharacterRelationships(newCharacterRelationships);

		return true;
	}

	async function saveRelationships() {
		if (!story?._id) return false;

		const newSelectedCharacterRelationships = JSON.parse(JSON.stringify(selectedCharacterRelationships));

		// Add New Relationships
		let newCharacterRelationshipsAddedIds = JSON.parse(JSON.stringify(characterRelationshipsAddedIds));
		const added_relationships_responses = await Promise.all(
			newCharacterRelationshipsAddedIds.map(async (relationship_id) => {
				const relationship = newSelectedCharacterRelationships.find((e) => e._id === relationship_id);
				if (!relationship) return { _id: relationship_id, message: "skip" };
				if (relationship?.isRemoved) return { _id: relationship_id, message: "skip" };

				const response = await APIRequest("/character-relationship?story_id=" + story._id, "POST", {
					_id: relationship._id,
					story_id: story._id,
					relationship_type: relationship.relationship_type,
					character_ids: relationship.character_ids,
				});
				if (!response || response?.errors) return { _id: relationship_id, message: "failure" };

				return { _id: relationship_id, message: "success" };
			})
		);
		if (added_relationships_responses.filter((e) => e.message === "failure").length !== 0) return false;
		newCharacterRelationshipsAddedIds = added_relationships_responses.filter((e) => e.message !== "success").map((e) => e._id);
		setCharacterRelationshipsAddedIds(newCharacterRelationshipsAddedIds);

		// Update Relationships
		const patched_responses = await Promise.all(
			newSelectedCharacterRelationships.map(async (relationship) => {
				if (relationship?.isRemoved) return { _id: relationship._id, message: "skip" };

				const response = await APIRequest("/character-relationship/" + relationship._id, "PATCH", {
					story_id: story._id,
					newValue: relationship,
				});
				if (!response || response?.errors) return { _id: relationship._id, message: "failure" };

				return { _id: relationship._id, message: "success" };
			})
		);
		if (patched_responses.filter((e) => e.message === "failure").length !== 0) return false;

		// Remove Relationships
		let newCharacterRelationshipsRemovedIds = JSON.parse(JSON.stringify(characterRelationshipsRemovedIds));
		const removed_relationships_responses = await Promise.all(
			newCharacterRelationshipsRemovedIds.map(async (relationship_id) => {
				if (newCharacterRelationshipsAddedIds.includes(relationship_id)) return { _id: relationship_id, message: "skip" };

				const relationship = newSelectedCharacterRelationships.find((e) => e._id === relationship_id);
				if (!relationship) return { _id: relationship_id, message: "skip" };

				const response = await APIRequest("/character-relationship/" + relationship_id + "?story_id=" + story._id, "DELETE");
				if (!response || response?.errors) return { _id: relationship_id, message: "failure" };

				return { _id: relationship_id, message: "success" };
			})
		);
		if (removed_relationships_responses.filter((e) => e.message === "failure").length !== 0) return false;
		setCharacterRelationshipsRemovedIds(removed_relationships_responses.filter((e) => e.message !== "failure").map((e) => e._id));

		return true;
	}

	async function addRelationship() {
		const character_id = JSON.parse(JSON.stringify(character?._id));

		const new_id_response = await APIRequest("/new-id/", "GET");
		const newId = new_id_response?.data?._id;
		if (!newId) return false;

		let newCharacterRelationships = JSON.parse(JSON.stringify(characterRelationships));
		newCharacterRelationships.push({ _id: newId, character_ids: [character_id], relationship_type: undefined });
		setCharacterRelationships(newCharacterRelationships);

		setCharacterRelationshipsAddedIds((oldCharacterRelationshipsAddedIds) => {
			let newCharacterRelationshipsAddedIds = JSON.parse(JSON.stringify(oldCharacterRelationshipsAddedIds));
			newCharacterRelationshipsAddedIds.push(newId);
			return newCharacterRelationshipsAddedIds;
		});
	}

	const selectedCharacterRef = useRef();
	function onSelectedCharacterContainerScroll(e) {
		if (selectedCharacterRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		selectedCharacter,
		selectedCharacterRelationships,
		revertRelationships,
		saveRelationships,
		addRelationship,
		selectedCharacterRef,
		onSelectedCharacterContainerScroll,
	};
};
