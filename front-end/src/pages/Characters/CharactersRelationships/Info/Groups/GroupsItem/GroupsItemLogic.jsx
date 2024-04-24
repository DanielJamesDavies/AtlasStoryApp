// Packages
import { useContext } from "react";

// Components

// Logic
import { CharactersContext } from "../../../../CharactersContext";

// Context

// Services

// Styles

// Assets

export const GroupsItemLogic = ({ group }) => {
	const { story, setStory } = useContext(CharactersContext);

	function toggleReversed() {
		let newStory = JSON.parse(JSON.stringify(story));
		const groupIndex = newStory?.data?.characterRelationshipsGroups.findIndex((e) => e._id === group._id);
		if (groupIndex === -1) return false;
		newStory.data.characterRelationshipsGroups[groupIndex].reversed = newStory?.data?.characterRelationshipsGroups[groupIndex].reversed
			? false
			: true;
		setStory(newStory);
	}

	return { toggleReversed };
};
