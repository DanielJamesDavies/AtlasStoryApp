// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../../context/StoryContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const CharacterCardsLogic = () => {
	const { story, setStory, storyCharacters, isReorderingCharacters } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	// Reorder Characters
	async function changePrimaryCharactersOrder(res) {
		let newStory = JSON.parse(JSON.stringify(story));

		if (res.from === undefined || res.to === undefined) return;

		const tempCharacter = newStory.data.primaryCharacters.splice(res.from, 1)[0];
		newStory.data.primaryCharacters.splice(res.to, 0, tempCharacter);

		setStory(newStory);

		await APIRequest("/story/" + newStory._id, "PATCH", {
			story_id: newStory._id,
			path: ["data", "primaryCharacters"],
			newValue: newStory.data.primaryCharacters,
		});
	}

	return { story, storyCharacters, isReorderingCharacters, changePrimaryCharactersOrder };
};
