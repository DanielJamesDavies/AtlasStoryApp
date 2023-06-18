// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RecentDataContext } from "../../../../../../context/RecentDataContext";

// Services

// Styles

// Assets

export const SettingsCardBackgroundImageLogic = () => {
	const { isAuthorizedToEdit, story, character, characterCardBackground, setCharacterCardBackground } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	const [errors, setErrors] = useState([]);

	function changeCardBackground(image) {
		setCharacterCardBackground(image);
	}

	async function revertCardBackground() {
		setErrors([]);
		const response = await APIRequest("/image/" + character?.data?.cardBackground, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setCharacterCardBackground(response.data.image.image);
		return true;
	}

	async function saveCardBackground() {
		setErrors([]);
		if (!character?._id) return;
		await APIRequest("/character/" + character?._id, "PATCH", {
			path: ["data", "cardBackground"],
			newValue: character?.data?.cardBackground,
			story_id: story._id,
			character_id: character._id,
		});
		const response = await APIRequest("/image/" + character?.data?.cardBackground, "PATCH", {
			newValue: characterCardBackground,
			story_id: story._id,
			character_id: character._id,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}

		addImagesToRecentImages([response?.data?.image]);

		return true;
	}

	return { isAuthorizedToEdit, characterCardBackground, changeCardBackground, revertCardBackground, saveCardBackground, errors };
};
