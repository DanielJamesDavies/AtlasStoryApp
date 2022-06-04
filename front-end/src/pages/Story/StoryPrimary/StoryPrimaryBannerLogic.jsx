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

export const StoryPrimaryBannerLogic = () => {
	const { isAuthorizedToEdit, story, banner, setBanner } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	async function changeStoryBanner(image) {
		setBanner(image);
	}

	async function revertStoryBanner() {
		if (!story?.data?.banner) return false;
		const response = await APIRequest("/image/" + story.data.banner, "GET");
		console.log(response);
		if (!response || response?.errors || !response?.data?.image) return false;
		setBanner(response.data.image);
		return true;
	}

	async function saveStoryBanner() {
		if (!story?.data?.banner) return false;
		const response = await APIRequest("/image/" + story.data.banner, "PATCH", { newValue: banner });
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, banner, changeStoryBanner, revertStoryBanner, saveStoryBanner };
};
