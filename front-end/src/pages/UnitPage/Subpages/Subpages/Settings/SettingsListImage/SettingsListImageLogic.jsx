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

export const SettingsListImageLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitListImage, setUnitListImage } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	const [errors, setErrors] = useState([]);

	function changeListImage(image) {
		setUnitListImage(image);
	}

	function removeListImage() {
		changeListImage(undefined);
	}

	async function revertListImage() {
		setErrors([]);
		const response = await APIRequest("/image/" + unit?.data?.listImage, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setUnitListImage(response.data.image.image);
		return true;
	}

	async function saveListImage() {
		setErrors([]);
		if (!unit?._id || !unit?.data?.listImage) return;
		await APIRequest("/" + unit_type + "/" + unit?._id, "PATCH", {
			path: ["data", "listImage"],
			newValue: unit?.data?.listImage,
			story_id: story._id,
			unit_id: unit._id,
		});
		const response = await APIRequest("/image/" + unit?.data?.listImage, "PATCH", {
			newValue: unitListImage,
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

	return { unit_type, isAuthorizedToEdit, unitListImage, changeListImage, removeListImage, revertListImage, saveListImage, errors };
};
