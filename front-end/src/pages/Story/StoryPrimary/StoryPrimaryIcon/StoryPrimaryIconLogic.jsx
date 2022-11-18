// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../StoryContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const StoryPrimaryIconLogic = () => {
	const { isAuthorizedToEdit, story, icon, setIcon } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

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
		if (!story?.data?.icon) return false;
		const response = await APIRequest("/image/" + story.data.icon, "PATCH", { newValue: icon, story_id: story._id });
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, icon, changeStoryIcon, revertStoryIcon, saveStoryIcon, errors };
};
