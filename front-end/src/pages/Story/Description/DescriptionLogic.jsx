// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../context/StoryContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const DescriptionLogic = () => {
	const { isAuthorizedToEdit, story, setStory } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	function changeStoryDescription(e) {
		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			newStory.data.description = e.target.value.split("\n");
			return newStory;
		});
	}

	async function revertStoryDescription() {
		const response = await APIRequest("/story/get-value/" + story._id, "POST", {
			story_id: story._id,
			path: ["data", "description"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			newStory.data.description = response.data.value;
			return newStory;
		});

		return true;
	}

	async function saveStoryDescription() {
		const response = await APIRequest("/story/" + story._id, "PATCH", {
			story_id: story._id,
			path: ["data", "description"],
			newValue: story.data.description,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, story, changeStoryDescription, revertStoryDescription, saveStoryDescription };
};
