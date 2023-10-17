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

export const SettingsMapImageLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, locationMapImage, setLocationMapImage } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	const [errors, setErrors] = useState([]);

	function changeMapImage(image) {
		setLocationMapImage(image);
	}

	function removeMapImage() {
		setLocationMapImage("NO_IMAGE");
	}

	async function revertMapImage() {
		setErrors([]);
		const response = await APIRequest("/image/" + unit?.data?.mapImage, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setLocationMapImage(response.data.image.image);
		return true;
	}

	async function saveMapImage() {
		setErrors([]);
		if (!unit?._id) return;
		await APIRequest("/" + unit_type + "/" + unit?._id, "PATCH", {
			path: ["data", "mapImage"],
			newValue: unit?.data?.mapImage,
			story_id: story._id,
			unit_id: unit._id,
		});
		const response = await APIRequest("/image/" + unit?.data?.mapImage, "PATCH", {
			newValue: locationMapImage,
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

	return {
		unit_type,
		isAuthorizedToEdit,
		locationMapImage,
		changeMapImage,
		removeMapImage,
		revertMapImage,
		saveMapImage,
		errors,
	};
};
