// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../../../LocationContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RecentDataContext } from "../../../../../../context/RecentDataContext";

// Services

// Styles

// Assets

export const SettingsOverviewBackgroundImageLogic = () => {
	const { isAuthorizedToEdit, story, location, locationOverviewBackground, setLocationOverviewBackground } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	const [errors, setErrors] = useState([]);

	function changeOverviewBackground(image) {
		setLocationOverviewBackground(image);
	}

	async function revertOverviewBackground() {
		setErrors([]);
		const response = await APIRequest("/image/" + location?.data?.overviewBackground, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setLocationOverviewBackground(response.data.image.image);
		return true;
	}

	async function saveOverviewBackground() {
		setErrors([]);
		if (!location?._id || !location?.data?.overviewBackground) return;
		await APIRequest("/location/" + location?._id, "PATCH", {
			path: ["data", "overviewBackground"],
			newValue: location?.data?.overviewBackground,
			story_id: story._id,
			location_id: location._id,
		});
		const response = await APIRequest("/image/" + location?.data?.overviewBackground, "PATCH", {
			newValue: locationOverviewBackground,
			story_id: story._id,
			location_id: location._id,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}

		addImagesToRecentImages([response?.data?.image]);

		return true;
	}

	return { isAuthorizedToEdit, locationOverviewBackground, changeOverviewBackground, revertOverviewBackground, saveOverviewBackground, errors };
};
