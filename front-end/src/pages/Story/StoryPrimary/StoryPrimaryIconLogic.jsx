// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../StoryContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const StoryPrimaryIconLogic = () => {
	const { isAuthorizedToEdit, story, icon, setIcon } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	async function changeStoryIcon(image) {
		setIcon(image);
	}

	async function revertStoryIcon() {
		if (!story?.data?.icon) return false;
		const response = await APIRequest("/image/" + story.data.icon, "GET");
		if (!response || response?.errors || !response?.data?.image) return false;
		setIcon(response.data.image);
		return true;
	}

	async function saveStoryIcon() {
		if (!story?.data?.icon) return false;
		const response = await APIRequest("/image/" + story.data.icon, "PATCH", { newValue: icon });
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, icon, changeStoryIcon, revertStoryIcon, saveStoryIcon };
};
