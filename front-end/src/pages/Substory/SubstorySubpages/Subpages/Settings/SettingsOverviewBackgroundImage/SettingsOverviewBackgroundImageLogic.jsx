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

export const SettingsOverviewBackgroundImageLogic = () => {
	const { isAuthorizedToEdit, story, substory, substoryOverviewBackground, setSubstoryOverviewBackground } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	const [errors, setErrors] = useState([]);

	function changeOverviewBackground(image) {
		setSubstoryOverviewBackground(image);
	}

	async function revertOverviewBackground() {
		setErrors([]);
		const response = await APIRequest("/image/" + substory?.data?.overviewBackground, "GET");
		if (!response || response?.errors || !response?.data?.image) return false;
		setSubstoryOverviewBackground(response.data.image);
		return true;
	}

	async function saveOverviewBackground() {
		setErrors([]);
		if (!substory?._id) return;
		const response = await APIRequest("/image/" + substory?.data?.overviewBackground, "PATCH", {
			newValue: substoryOverviewBackground,
			story_id: story._id,
			substory_id: substory._id,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, substoryOverviewBackground, changeOverviewBackground, revertOverviewBackground, saveOverviewBackground, errors };
};
