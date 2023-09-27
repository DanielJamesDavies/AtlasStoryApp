// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";
import { APIContext } from "../../../context/APIContext";

// Services
import getColourWithTint from "../../../services/GetColourWithTint";

// Styles

// Assets

export const CharactersCharacterTypesLogic = () => {
	const {
		isAuthorizedToEdit,
		story,
		setStory,
		storyCharacterTypes,
		characterType,
		changeCharacterType,
		setIsDisplayingCreateCharacterTypeForm,
		isReorderingCharacterTypes,
		toggleIsReorderingCharacterTypes,
	} = useContext(CharactersContext);
	const { APIRequest, authorized_user_id } = useContext(APIContext);

	const [activeTypeColours, setActiveTypeColours] = useState(["#0044ff", "#0044ff"]);

	useEffect(() => {
		if (characterType?.data?.colour) {
			setActiveTypeColours(getColourWithTint(characterType?.data?.colour));
		} else {
			setActiveTypeColours(["#0044ff", "#0044ff"]);
		}
	}, [characterType, setActiveTypeColours]);

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
		isAuthorizedToEdit,
		authorized_user_id,
		story,
		storyCharacterTypes,
		characterType,
		changeCharacterType,
		openCreateCharacterTypeForm,
		isReorderingCharacterTypes,
		toggleIsReorderingCharacterTypes,
		changeCharacterTypesOrder,
		activeTypeColours,
	};
};
