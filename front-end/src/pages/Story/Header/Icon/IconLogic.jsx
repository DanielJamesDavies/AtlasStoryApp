// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../../context/StoryContext";
import { APIContext } from "../../../../context/APIContext";
import { LightboxContext } from "../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const IconLogic = () => {
	const { isAuthorizedToEdit, story, storyIcon, setStoryIcon } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	const [errors, setErrors] = useState([]);

	async function changeStoryIcon(image) {
		setErrors([]);
		setStoryIcon(image);
	}

	async function revertStoryIcon() {
		setErrors([]);
		if (!story?.data?.icon) return false;
		const response = await APIRequest("/image/" + story.data.icon, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setStoryIcon(response.data.image.image);
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
		const response = await APIRequest("/image/" + story.data.icon, "PATCH", { newValue: storyIcon, story_id: story._id });
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

	return { isAuthorizedToEdit, storyIcon, changeStoryIcon, revertStoryIcon, saveStoryIcon, onClickIcon, errors };
};
