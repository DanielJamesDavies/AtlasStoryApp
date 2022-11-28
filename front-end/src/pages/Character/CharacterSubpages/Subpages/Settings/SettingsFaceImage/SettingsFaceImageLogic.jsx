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

export const SettingsFaceImageLogic = () => {
	const { isAuthorizedToEdit, story, character, characterFaceImage, setCharacterFaceImage } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	const [errors, setErrors] = useState([]);

	function changeFaceImage(image) {
		setCharacterFaceImage(image);
	}

	async function revertFaceImage() {
		setErrors([]);
		const response = await APIRequest("/image/" + character?.data?.faceImage, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setCharacterFaceImage(response.data.image.image);
		return true;
	}

	async function saveFaceImage() {
		setErrors([]);
		if (!character?._id) return;
		await APIRequest("/character/" + character?._id, "PATCH", {
			path: ["data", "faceImage"],
			newValue: character?.data?.faceImage,
			story_id: story._id,
			character_id: character._id,
		});
		const response = await APIRequest("/image/" + character?.data?.faceImage, "PATCH", {
			newValue: characterFaceImage,
			story_id: story._id,
			character_id: character._id,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, characterFaceImage, changeFaceImage, revertFaceImage, saveFaceImage, errors };
};
