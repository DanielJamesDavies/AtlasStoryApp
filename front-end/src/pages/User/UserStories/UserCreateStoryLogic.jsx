// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";
import { APIContext } from "../../../context/APIContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const UserCreateStoryLogic = () => {
	const { isDisplayingCreateStoryForm, setIsDisplayingCreateStoryForm } = useContext(UserContext);

	function closeCreateStoryForm() {
		setIsDisplayingCreateStoryForm(false);
	}

	const [storyTitle, setStoryTitle] = useState("");

	function changeStoryTitle(e) {
		setStoryTitle(e.target.value);
	}

	const [storyUID, setStoryUID] = useState("");
	function changeStoryUID(e) {
		setStoryUID(e.target.value);
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
		storyIsPrivate,
		toggleStoryIsPrivate,
		errors,
		submitCreateStory,
	};
};
