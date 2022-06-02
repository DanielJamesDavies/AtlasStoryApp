// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const CharactersCharacterTypesLogic = () => {
	const {
		isAuthorizedToModify,
		story,
		setStory,
		characterTypes,
		characterType,
		changeCharacterType,
		setIsDisplayingCreateCharacterTypeForm,
		isReorderingCharacterTypes,
		toggleIsReorderingCharacterTypes,
	} = useContext(CharactersContext);
	const { APIRequest } = useContext(APIContext);

	function openCreateCharacterTypeForm() {
		setIsDisplayingCreateCharacterTypeForm(true);
	}

	async function changeCharacterTypesOrder(res) {
		let newStory = JSON.parse(JSON.stringify(story));
		if (res.from === undefined || res.to === undefined) return;
		const tempCharacterType = newStory.data.characterTypes.splice(res.from, 1)[0];
		newStory.data.characterTypes.splice(res.to, 0, tempCharacterType);

		setStory(newStory);

		await APIRequest("/story/" + newStory._id, "PATCH", {
			story_id: newStory._id,
			path: ["data", "characterTypes"],
			newValue: newStory.data.characterTypes,
		});
	}

	return {
		isAuthorizedToModify,
		story,
		characterTypes,
		characterType,
		changeCharacterType,
		openCreateCharacterTypeForm,
		isReorderingCharacterTypes,
		toggleIsReorderingCharacterTypes,
		changeCharacterTypesOrder,
	};
};
