// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RecentDataContext } from "../../../../../../context/RecentDataContext";

// Services

// Styles

// Assets

export const SettingsPosterBackgroundImageLogic = () => {
	const { isAuthorizedToEdit, story, substory, substoryPosterBackground, setSubstoryPosterBackground } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	const [errors, setErrors] = useState([]);

	function changePosterBackground(image) {
		setSubstoryPosterBackground(image);
	}

	async function revertPosterBackground() {
		setErrors([]);
		const response = await APIRequest("/image/" + substory?.data?.posterBackground, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setSubstoryPosterBackground(response.data.image.image);
		return true;
	}

	async function savePosterBackground() {
		setErrors([]);
		if (!substory?._id || !substory?.data?.posterBackground) return;
		await APIRequest("/substory/" + substory?._id, "PATCH", {
			path: ["data", "posterBackground"],
			newValue: substory?.data?.posterBackground,
			story_id: story._id,
			substory_id: substory._id,
		});
		const response = await APIRequest("/image/" + substory?.data?.posterBackground, "PATCH", {
			newValue: substoryPosterBackground,
			story_id: story._id,
			substory_id: substory._id,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}

		addImagesToRecentImages([response?.data?.image]);

		return true;
	}

	return { isAuthorizedToEdit, substoryPosterBackground, changePosterBackground, revertPosterBackground, savePosterBackground, errors };
};
