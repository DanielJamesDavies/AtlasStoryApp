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

export const StoryGenresLogic = () => {
	const { isAuthorizedToEdit, story, setStory } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	function changeStoryGenres(e) {
		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			newStory.data.genres = e.target.value;
			return newStory;
		});
	}

	async function revertStoryGenres() {
		const response = await APIRequest("/story/get-value/" + story._id, "POST", {
			story_id: story._id,
			path: ["data", "genres"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setStory((oldStory) => {
			let newStory = JSON.parse(JSON.stringify(oldStory));
			newStory.data.genres = response.data.value;
			return newStory;
		});

		return true;
	}

	async function saveStoryGenres() {
		const response = await APIRequest("/story/" + story._id, "PATCH", {
			story_id: story._id,
			path: ["data", "genres"],
			newValue: story.data.genres,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, story, changeStoryGenres, revertStoryGenres, saveStoryGenres };
};
