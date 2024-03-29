// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../../context/StoryContext";
import { APIContext } from "../../../../context/APIContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const DeleteLogic = () => {
	const { isAuthorizedToEdit, story, isDisplayingSettings, setIsDisplayingSettings } = useContext(StoryContext);
	const { APIRequest, username } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	const [errors, setErrors] = useState([]);

	async function deleteStory() {
		if (!story._id) return false;
		setErrors([]);
		const response = await APIRequest("/story/" + story._id, "DELETE", { story_id: story._id });
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		setIsDisplayingSettings(false);
		changeLocation("/u/" + username);
		return true;
	}

	return { isAuthorizedToEdit, isDisplayingSettings, errors, deleteStory };
};
