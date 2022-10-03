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

export const SettingsTitleOnPosterLogic = () => {
	const { isAuthorizedToEdit, story, substory, setSubstory } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	function toggleIsTitleOnPoster() {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.isTitleOnPoster = !newSubstory.data.isTitleOnPoster;
			return newSubstory;
		});
	}

	async function revertIsTitleOnPoster() {
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "isTitleOnPoster"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.isTitleOnPoster = response.data.value;
			return newSubstory;
		});

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveIsTitleOnPoster() {
		setErrors([]);
		if (!substory?._id) return;
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "isTitleOnPoster"],
			newValue: substory.data.isTitleOnPoster,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, substory, toggleIsTitleOnPoster, revertIsTitleOnPoster, saveIsTitleOnPoster, errors };
};
