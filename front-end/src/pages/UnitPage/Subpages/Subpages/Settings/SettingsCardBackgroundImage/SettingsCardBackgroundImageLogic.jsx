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

export const SettingsCardBackgroundImageLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, characterCardBackground, setUnitCardBackground } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	const [errors, setErrors] = useState([]);

	function changeCardBackground(image) {
		setUnitCardBackground(image);
	}

	function removeCardBackground() {
		changeCardBackground(undefined);
	}

	async function revertCardBackground() {
		setErrors([]);
		const response = await APIRequest("/image/" + unit?.data?.cardBackground, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setUnitCardBackground(response.data.image.image);
		return true;
	}

	async function saveCardBackground() {
		setErrors([]);
		if (!unit?._id) return;
		await APIRequest("/" + unit_type + "/" + unit?._id, "PATCH", {
			path: ["data", "cardBackground"],
			newValue: unit?.data?.cardBackground,
			story_id: story._id,
			unit_id: unit._id,
		});
		const response = await APIRequest("/image/" + unit?.data?.cardBackground, "PATCH", {
			newValue: characterCardBackground,
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
		characterCardBackground,
		changeCardBackground,
		removeCardBackground,
		revertCardBackground,
		saveCardBackground,
		errors,
	};
};
