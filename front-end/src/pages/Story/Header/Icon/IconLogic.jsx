// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../StoryContext";
import { APIContext } from "../../../../context/APIContext";
import { LightboxContext } from "../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const IconLogic = () => {
	const { isAuthorizedToEdit, story, icon, setIcon } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	const [errors, setErrors] = useState([]);

	async function changeStoryIcon(image) {
		setErrors([]);
		setIcon(image);
	}

	async function revertStoryIcon() {
		setErrors([]);
		if (!story?.data?.icon) return false;
		const response = await APIRequest("/image/" + story.data.icon, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setIcon(response.data.image.image);
		return true;
	}

	async function saveStoryIcon() {
		setErrors([]);
		if (!story?._id || !story?.data?.icon) return;
		await APIRequest("/story/" + story?._id, "PATCH", {
			path: ["data", "icon"],
			newValue: story?.data?.icon,
			story_id: story._id,
		});
		const response = await APIRequest("/image/" + story.data.icon, "PATCH", { newValue: icon, story_id: story._id });
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	function onClickIcon() {
		setLightboxImageIDs([story?.data?.icon]);
		setLightboxIndex(0);
	}

	return { isAuthorizedToEdit, icon, changeStoryIcon, revertStoryIcon, saveStoryIcon, onClickIcon, errors };
};
