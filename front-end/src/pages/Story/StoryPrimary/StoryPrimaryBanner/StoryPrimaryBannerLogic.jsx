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

export const StoryPrimaryBannerLogic = () => {
	const { isAuthorizedToEdit, story, banner, setBanner } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	const [errors, setErrors] = useState([]);

	async function changeStoryBanner(image) {
		setErrors([]);
		setBanner(image);
	}

	async function revertStoryBanner() {
		setErrors([]);
		if (!story?.data?.banner) return false;
		const response = await APIRequest("/image/" + story.data.banner, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setBanner(response.data.image.image);
		return true;
	}

	async function saveStoryBanner() {
		setErrors([]);
		if (!story?.data?.banner) return false;
		const response = await APIRequest("/image/" + story.data.banner, "PATCH", { newValue: banner, story_id: story._id });
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, banner, changeStoryBanner, errors, revertStoryBanner, saveStoryBanner };
};
