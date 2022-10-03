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

export const StoryPrimaryTitleLogic = () => {
	const { isAuthorizedToEdit, story, setStory } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	function changeStoryTitle(e) {
		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			newStory.data.title = e.target.value;
			return newStory;
		});
	}

	async function revertStoryTitle() {
		const response = await APIRequest("/story/get-value/" + story._id, "POST", {
			story_id: story._id,
			path: ["data", "title"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			newStory.data.title = response.data.value;
			return newStory;
		});

		return true;
	}

	async function saveStoryTitle() {
		const response = await APIRequest("/story/" + story._id, "PATCH", {
			story_id: story._id,
			path: ["data", "title"],
			newValue: story.data.title,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, story, changeStoryTitle, revertStoryTitle, saveStoryTitle };
};
