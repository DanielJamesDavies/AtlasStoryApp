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

export const StorySettingsColoursLogic = () => {
	const { isAuthorizedToEdit, story, setStory, updateStoryColours } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	const [errors, setErrors] = useState([]);

	function changeAccentColour(e) {
		let newStory = JSON.parse(JSON.stringify(story));
		newStory.data.colours.accent = e;
		setStory(newStory);
		updateStoryColours(newStory.data.colours);
	}

	async function revertAccentColour() {
		const response = await APIRequest("/story/get-value/" + story._id, "POST", {
			story_id: story._id,
			path: ["data", "colours", "accent"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newStory = JSON.parse(JSON.stringify(story));
		newStory.data.colours.accent = response.data.value;
		setStory(newStory);
		updateStoryColours(newStory.data.colours);

		return true;
	}

	async function saveAccentColour() {
		setErrors([]);
		if (!story?._id) return;
		const response = await APIRequest("/story/" + story._id, "PATCH", {
			story_id: story._id,
			path: ["data", "colours", "accent"],
			newValue: story?.data?.colours?.accent,
		});
		if (!response || response?.errors || !response?.data?.story?.uid) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	function changeAccentHoverColour(e) {
		let newStory = JSON.parse(JSON.stringify(story));
		newStory.data.colours.accentHover = e;
		setStory(newStory);
		updateStoryColours(newStory.data.colours);
	}

	async function revertAccentHoverColour() {
		const response = await APIRequest("/story/get-value/" + story._id, "POST", {
			story_id: story._id,
			path: ["data", "colours", "accentHover"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newStory = JSON.parse(JSON.stringify(story));
		newStory.data.colours.accentHover = response.data.value;
		setStory(newStory);

		return true;
	}

	async function saveAccentHoverColour() {
		setErrors([]);
		if (!story?._id) return;
		const response = await APIRequest("/story/" + story._id, "PATCH", {
			story_id: story._id,
			path: ["data", "colours", "accentHover"],
			newValue: story?.data?.colours?.accentHover,
		});
		if (!response || response?.errors || !response?.data?.story?.uid) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return {
		isAuthorizedToEdit,
		story,
		changeAccentColour,
		revertAccentColour,
		saveAccentColour,
		changeAccentHoverColour,
		revertAccentHoverColour,
		saveAccentHoverColour,
		errors,
	};
};
