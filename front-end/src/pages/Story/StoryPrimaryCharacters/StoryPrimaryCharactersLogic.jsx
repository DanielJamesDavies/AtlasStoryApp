// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../StoryContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const StoryPrimaryCharactersLogic = () => {
	const { isAuthorizedToModify, story, primaryCharacters, setPrimaryCharacters, isReorderingCharacters, toggleIsReorderingCharacters } =
		useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	async function changePrimaryCharactersOrder(res) {
		let newStory = JSON.parse(JSON.stringify(story));
		let newPrimaryCharacters = JSON.parse(JSON.stringify(primaryCharacters));

		const tempCharacter = newPrimaryCharacters.splice(res.from, 1)[0];
		newPrimaryCharacters.splice(res.to, 0, tempCharacter);

		setPrimaryCharacters(newPrimaryCharacters);

		newPrimaryCharacters = newPrimaryCharacters
			.map((primaryCharacter) => (primaryCharacter?._id ? primaryCharacter._id : false))
			.filter((e) => e !== false);

		await APIRequest("/story/" + newStory._id, "PATCH", {
			story_id: newStory._id,
			path: ["data", "primaryCharacters"],
			newValue: newPrimaryCharacters,
		});
	}

	return { isAuthorizedToModify, primaryCharacters, isReorderingCharacters, toggleIsReorderingCharacters, changePrimaryCharactersOrder };
};
