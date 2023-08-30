// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../LocationContext";
import { APIContext } from "../../../../context/APIContext";
import { RecentDataContext } from "../../../../context/RecentDataContext";

// Services
import getImageFromFile from "../../../../services/GetImageFromFile";

// Styles

// Assets

export const ChangeOverviewBackgroundLogic = () => {
	const { isAuthorizedToEdit, story, location, locationOverviewBackground, setLocationOverviewBackground } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);
	const inputRef = useRef();

	async function changeOverviewBackground(e) {
		if (!location?._id) return;

		let image = await getImageFromFile(e.target.files[0]);
		inputRef.current.value = [];
		if (image?.error || !image?.data) return;
		image = image.data;

		setLocationOverviewBackground(image);

		await APIRequest("/location/" + location?._id, "PATCH", {
			path: ["data", "overviewBackground"],
			newValue: location?.data?.overviewBackground,
			story_id: story._id,
			location_id: location._id,
		});
		const response = await APIRequest("/image/" + location?.data?.overviewBackground, "PATCH", {
			newValue: image,
			story_id: story._id,
			location_id: location._id,
		});
		if (!response || response?.errors) return false;

		addImagesToRecentImages([response?.data?.image]);

		return true;
	}

	return {
		isAuthorizedToEdit,
		inputRef,
		locationOverviewBackground,
		changeOverviewBackground,
	};
};
