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

export const SettingsOverviewBackgroundImageLogic = () => {
	const { isAuthorizedToEdit, story, character, characterOverviewBackground, setCharacterOverviewBackground } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	const [errors, setErrors] = useState([]);

	function changeOverviewBackground(image) {
		setCharacterOverviewBackground(image);
	}

	async function revertOverviewBackground() {
		setErrors([]);
		const response = await APIRequest("/image/" + character?.data?.overviewBackground, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setCharacterOverviewBackground(response.data.image.image);
		return true;
	}

	async function saveOverviewBackground() {
		setErrors([]);
		if (!character?._id) return;
		await APIRequest("/character/" + character?._id, "PATCH", {
			path: ["data", "overviewBackground"],
			newValue: character?.data?.overviewBackground,
			story_id: story._id,
			character_id: character._id,
		});
		const response = await APIRequest("/image/" + character?.data?.overviewBackground, "PATCH", {
			newValue: characterOverviewBackground,
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

	return { isAuthorizedToEdit, characterOverviewBackground, changeOverviewBackground, revertOverviewBackground, saveOverviewBackground, errors };
};
