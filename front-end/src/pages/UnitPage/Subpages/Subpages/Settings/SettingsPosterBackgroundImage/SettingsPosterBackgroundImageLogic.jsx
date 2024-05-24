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

export const SettingsPosterBackgroundImageLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, plotPosterBackground, setPlotPosterBackground } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	const [errors, setErrors] = useState([]);

	function changePosterBackground(image) {
		setPlotPosterBackground(image);
	}

	function removePosterBackground() {
		changePosterBackground(undefined);
	}

	async function revertPosterBackground() {
		setErrors([]);
		const response = await APIRequest("/image/" + unit?.data?.posterBackground, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setPlotPosterBackground(response.data.image.image);
		return true;
	}

	async function savePosterBackground() {
		setErrors([]);
		if (!unit?._id) return;
		await APIRequest("/" + unit_type + "/" + unit?._id, "PATCH", {
			path: ["data", "posterBackground"],
			newValue: unit?.data?.posterBackground,
			story_id: story._id,
			unit_id: unit._id,
		});

		const response = await APIRequest("/image/" + unit?.data?.posterBackground, "PATCH", {
			newValue: plotPosterBackground,
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
		plotPosterBackground,
		changePosterBackground,
		removePosterBackground,
		revertPosterBackground,
		savePosterBackground,
		errors,
	};
};
