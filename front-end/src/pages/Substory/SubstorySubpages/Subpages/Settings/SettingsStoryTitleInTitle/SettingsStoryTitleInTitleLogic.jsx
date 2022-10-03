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

export const SettingsStoryTitleInTitleLogic = () => {
	const { isAuthorizedToEdit, story, substory, setSubstory } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	function toggleIsStoryTitleInTitle() {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.isStoryTitleInTitle = !newSubstory.data.isStoryTitleInTitle;
			return newSubstory;
		});
	}

	async function revertIsStoryTitleInTitle() {
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "isStoryTitleInTitle"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.isStoryTitleInTitle = response.data.value;
			return newSubstory;
		});

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveIsStoryTitleInTitle() {
		setErrors([]);
		if (!substory?._id) return;
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "isStoryTitleInTitle"],
			newValue: substory.data.isStoryTitleInTitle,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, substory, toggleIsStoryTitleInTitle, revertIsStoryTitleInTitle, saveIsStoryTitleInTitle, errors };
};
