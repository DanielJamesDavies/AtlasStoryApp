// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../../../CharacterContext";

// Services

// Styles

// Assets

export const CharacterRelationshipsInfoHomeRelationshipTypeItemLogic = ({ relationship }) => {
	const { story, setStory } = useContext(CharacterContext);

	function changeRelationshipTypeName(e) {
		let newStory = JSON.parse(JSON.stringify(story));
		const relationshipIndex = newStory.data.characterRelationshipTypes.findIndex((e) => e._id === relationship._id);
		if (relationshipIndex === -1) return false;
		newStory.data.characterRelationshipTypes[relationshipIndex].name = e.target.value;
		setStory(newStory);
	}

	function changeRelationshipTypeColour(newColour) {
		let newStory = JSON.parse(JSON.stringify(story));
		const relationshipIndex = newStory.data.characterRelationshipTypes.findIndex((e) => e._id === relationship._id);
		if (relationshipIndex === -1) return false;
		newStory.data.characterRelationshipTypes[relationshipIndex].colour = newColour;
		setStory(newStory);
	}

	function removeRelationshipType() {
		let newStory = JSON.parse(JSON.stringify(story));
		const relationshipIndex = newStory.data.characterRelationshipTypes.findIndex((e) => e._id === relationship._id);
		if (relationshipIndex === -1) return false;
		newStory.data.characterRelationshipTypes.splice(relationshipIndex, 1);
		setStory(newStory);
	}

	return { changeRelationshipTypeName, changeRelationshipTypeColour, removeRelationshipType };
};
