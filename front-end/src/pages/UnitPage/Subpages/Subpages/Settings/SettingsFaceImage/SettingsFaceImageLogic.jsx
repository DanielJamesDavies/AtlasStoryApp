// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RecentDataContext } from "../../../../../../context/RecentDataContext";

// Services

// Styles

// Assets

export const SettingsFaceImageLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, characterFaceImage, setCharacterFaceImage } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	const [errors, setErrors] = useState([]);

	function changeFaceImage(image) {
		setCharacterFaceImage(image);
	}

	function removeFaceImage() {
		changeFaceImage(undefined);
	}

	async function revertFaceImage() {
		setErrors([]);
		const response = await APIRequest("/image/" + unit?.data?.faceImage, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setCharacterFaceImage(response.data.image.image);
		return true;
	}

	async function saveFaceImage() {
		setErrors([]);
		if (!unit?._id || !unit?.data?.faceImage) return;
		await APIRequest("/" + unit_type + "/" + unit?._id, "PATCH", {
			path: ["data", "faceImage"],
			newValue: unit?.data?.faceImage,
			story_id: story._id,
			unit_id: unit._id,
		});
		const response = await APIRequest("/image/" + unit?.data?.faceImage, "PATCH", {
			newValue: characterFaceImage,
			story_id: story._id,
			unit_id: unit._id,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		addImagesToRecentImages([response?.data?.image]);
		return true;
	}

	return { unit_type, isAuthorizedToEdit, characterFaceImage, changeFaceImage, removeFaceImage, revertFaceImage, saveFaceImage, errors };
};
