// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../../../../CharactersContext";

// Services

// Styles

// Assets

export const CharactersRelationshipsInfoHomeRelationshipTypeItemLogic = ({ relationship }) => {
	const { story, setStory } = useContext(CharactersContext);

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
