// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../StoryContext";
import { APIContext } from "../../../context/APIContext";
import { LightboxContext } from "../../../context/LightboxContext";

// Services

// Styles

// Assets

export const BannerLogic = () => {
	const { isAuthorizedToEdit, story, banner, setBanner } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

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
		if (!story?._id || !story?.data?.banner) return;
		await APIRequest("/story/" + story?._id, "PATCH", {
			path: ["data", "banner"],
			newValue: story?.data?.banner,
			story_id: story._id,
		});
		const response = await APIRequest("/image/" + story.data.banner, "PATCH", { newValue: banner, story_id: story._id });
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	function onClickBanner() {
		setLightboxImageIDs([story?.data?.banner]);
		setLightboxIndex(0);
	}

	return { isAuthorizedToEdit, banner, changeStoryBanner, errors, revertStoryBanner, saveStoryBanner, onClickBanner };
};
