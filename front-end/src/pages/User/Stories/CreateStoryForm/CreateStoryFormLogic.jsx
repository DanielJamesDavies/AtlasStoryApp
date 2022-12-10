// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../../UserContext";
import { APIContext } from "../../../../context/APIContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const CreateStoryFormLogic = () => {
	const { isDisplayingCreateStoryForm, setIsDisplayingCreateStoryForm } = useContext(UserContext);

	function closeCreateStoryForm() {
		setIsDisplayingCreateStoryForm(false);
	}

	const [storyUIDSuggestions, setStoryUIDSuggestions] = useState([]);

	function updateStoryUIDSuggestions(newTitle) {
		let newStoryUIDSuggestions = [];

		newStoryUIDSuggestions.push(newTitle.toLowerCase().split(" ").join(""));

		const newTitleSplitBySpace = newTitle.split(" ");
		if (newTitleSplitBySpace.length > 1) newStoryUIDSuggestions.push(newTitleSplitBySpace.join("-").toLowerCase());

		if (newTitle.toLowerCase() !== newTitle) newStoryUIDSuggestions.push(newTitle.split(" ").join(""));

		if (newTitleSplitBySpace.length > 1 && newTitle.toLowerCase() !== newTitle) newStoryUIDSuggestions.push(newTitleSplitBySpace.join("-"));

		setStoryUIDSuggestions(newStoryUIDSuggestions);
	}

	const [storyTitle, setStoryTitle] = useState("");

	function changeStoryTitle(e) {
		setStoryTitle(e.target.value);
		updateStoryUIDSuggestions(e.target.value);
	}

	const [storyUID, setStoryUID] = useState("");
	function changeStoryUID(e) {
		setStoryUID(e.target.value.split(" ").join("-"));
	}

	const [storyIsPrivate, setStoryIsPrivate] = useState(false);
	function toggleStoryIsPrivate() {
		setStoryIsPrivate((oldStoryIsPrivate) => !oldStoryIsPrivate);
	}

	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [errors, setErrors] = useState([]);

	async function submitCreateStory() {
		const response = await APIRequest("/story", "POST", {
			title: JSON.parse(JSON.stringify(storyTitle)),
			uid: JSON.parse(JSON.stringify(storyUID)),
			isPrivate: JSON.parse(JSON.stringify(storyIsPrivate)),
		});
		if (!response) return;
		if (response?.errors) return setErrors(response.errors);
		if (response?.data?.story_uid) changeLocation("/s/" + response.data.story_uid);
	}

	return {
		isDisplayingCreateStoryForm,
		closeCreateStoryForm,
		storyTitle,
		changeStoryTitle,
		storyUID,
		changeStoryUID,
		storyUIDSuggestions,
		storyIsPrivate,
		toggleStoryIsPrivate,
		errors,
		submitCreateStory,
	};
};
