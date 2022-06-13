// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SettingsOverviewBackgroundImageLogic = () => {
	const { isAuthorizedToEdit, story, character, characterOverviewBackground, setCharacterOverviewBackground } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	const [errors, setErrors] = useState([]);

	function changeOverviewBackground(image) {
		setCharacterOverviewBackground(image);
	}

	async function revertOverviewBackground() {
		setErrors([]);
		const response = await APIRequest("/image/" + character?.data?.overviewBackground, "GET");
		if (!response || response?.errors || !response?.data?.image) return false;
		setCharacterOverviewBackground(response.data.image);
		return true;
	}

	async function saveOverviewBackground() {
		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/image/" + character?.data?.overviewBackground, "PATCH", {
			newValue: characterOverviewBackground,
			story_id: story._id,
			character_id: character._id,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, characterOverviewBackground, changeOverviewBackground, revertOverviewBackground, saveOverviewBackground, errors };
};
