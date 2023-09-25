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

export const SettingsOverviewBackgroundImageLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitOverviewBackground, setUnitOverviewBackground } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	const [errors, setErrors] = useState([]);

	function changeOverviewBackground(image) {
		setUnitOverviewBackground(image);
	}

	function removeOverviewBackground() {
		setUnitOverviewBackground("NO_IMAGE");
	}

	async function revertOverviewBackground() {
		setErrors([]);
		const response = await APIRequest("/image/" + unit?.data?.overviewBackground, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setUnitOverviewBackground(response.data.image.image);
		return true;
	}

	async function saveOverviewBackground() {
		setErrors([]);
		if (!unit?._id) return;
		await APIRequest("/" + unit_type + "/" + unit?._id, "PATCH", {
			path: ["data", "overviewBackground"],
			newValue: unit?.data?.overviewBackground,
			story_id: story._id,
			unit_id: unit._id,
		});
		const response = await APIRequest("/image/" + unit?.data?.overviewBackground, "PATCH", {
			newValue: unitOverviewBackground,
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
		isAuthorizedToEdit,
		unitOverviewBackground,
		changeOverviewBackground,
		removeOverviewBackground,
		revertOverviewBackground,
		saveOverviewBackground,
		errors,
	};
};
