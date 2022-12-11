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

export const PrivateLogic = () => {
	const { story, setStory } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	const [errors, setErrors] = useState([]);

	async function toggleIsStoryPrivate() {
		setErrors([]);

		const newIsPrivate = story.data.isPrivate ? false : true;

		const response = await APIRequest("/story/" + story._id, "PATCH", {
			story_id: story._id,
			path: ["data", "isPrivate"],
			newValue: newIsPrivate,
		});
		if (!response || response?.errors || response?.data?.story?.data?.isPrivate === undefined) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}

		const newStory = JSON.parse(JSON.stringify(story));
		newStory.data.isPrivate = response.data.story.data.isPrivate;
		setStory(newStory);

		return true;
	}

	return { errors, story, toggleIsStoryPrivate };
};
