// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SettingsPosterBackgroundImageLogic = () => {
	const { isAuthorizedToEdit, story, substory, substoryPosterBackground, setSubstoryPosterBackground } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	const [errors, setErrors] = useState([]);

	function changePosterBackground(image) {
		setSubstoryPosterBackground(image);
	}

	async function revertPosterBackground() {
		setErrors([]);
		const response = await APIRequest("/image/" + substory?.data?.posterBackground, "GET");
		if (!response || response?.errors || !response?.data?.image) return false;
		setSubstoryPosterBackground(response.data.image);
		return true;
	}

	async function savePosterBackground() {
		setErrors([]);
		if (!substory?._id) return;
		const response = await APIRequest("/image/" + substory?.data?.posterBackground, "PATCH", {
			newValue: substoryPosterBackground,
			story_id: story._id,
			substory_id: substory._id,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, substoryPosterBackground, changePosterBackground, revertPosterBackground, savePosterBackground, errors };
};
