// Packages
import { useContext, useRef, useState } from "react";

// Components

// Logic
import { CharacterContext } from "../../../../../CharacterContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Context

// Services

// Styles

// Assets

export const CharacterRelationshipsInfoRelationshipTypesLogic = () => {
	const { isAuthorizedToEdit, story, setStory, setRelationshipsFilters } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	async function revertRelationshipTypes() {
		const response = await APIRequest("/story/get-value/" + story._id, "POST", {
			story_id: story._id,
			path: ["data", "characterRelationshipTypes"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			newStory.data.characterRelationshipTypes = response.data.value;
			return newStory;
		});

		return true;
	}

	async function saveRelationshipTypes() {
		const response = await APIRequest("/story/" + story._id, "PATCH", {
			story_id: story._id,
			path: ["data", "characterRelationshipTypes"],
			newValue: story.data.characterRelationshipTypes,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	const [isReorderingRelationshipTypes, setIsReorderingRelationshipTypes] = useState(false);

	function toggleIsReorderingRelationshipTypes() {
		setIsReorderingRelationshipTypes((oldIsReorderingRelationshipTypes) => !oldIsReorderingRelationshipTypes);
	}

	function changeRelationshipTypesOrder(res) {
		if (res.from === undefined || res.to === undefined) return;

		let newStory = JSON.parse(JSON.stringify(story));
		const tempRelationshipType = newStory.data.characterRelationshipTypes.splice(res.from, 1)[0];
		newStory.data.characterRelationshipTypes.splice(res.to, 0, tempRelationshipType);
		setStory(newStory);
	}

	async function addRelationshipType() {
		let newStory = JSON.parse(JSON.stringify(story));
		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response?.data?._id) return false;
		newStory.data.characterRelationshipTypes.push({ _id: new_id_response.data._id, name: "New Relationship Type", colour: "#0044ff" });
		setStory(newStory);
		setRelationshipsFilters((oldRelationshipsFilters) => {
			let newRelationshipsFilters = JSON.parse(JSON.stringify(oldRelationshipsFilters));
			if (newRelationshipsFilters.relationshipTypes) newRelationshipsFilters.relationshipTypes.push(new_id_response.data._id);
			return newRelationshipsFilters;
		});
	}

	const relationshipTypesRef = useRef();
	function onRelationshipTypesScroll(e) {
		if (relationshipTypesRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	return {
		isAuthorizedToEdit,
		story,
		revertRelationshipTypes,
		saveRelationshipTypes,
		addRelationshipType,
		isReorderingRelationshipTypes,
		toggleIsReorderingRelationshipTypes,
		changeRelationshipTypesOrder,
		relationshipTypesRef,
		onRelationshipTypesScroll,
	};
};
