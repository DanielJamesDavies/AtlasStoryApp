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
	const [storyURL, setStoryURL] = useState("");
	const [storyIsPrivate, setStoryIsPrivate] = useState(false);

	function changeStoryTitle(e) {
		setStoryTitle(e.target.value);
	}

	function changeStoryURL(e) {
		setStoryURL(e.target.value);
	}

	function toggleStoryIsPrivate() {
		setStoryIsPrivate((oldStoryIsPrivate) => !oldStoryIsPrivate);
	}

	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [errors, setErrors] = useState([]);

	async function submitCreateStory() {
		const response = await APIRequest("/story", "POST", {
			title: JSON.parse(JSON.stringify(storyTitle)),
			url: JSON.parse(JSON.stringify(storyURL)),
			isPrivate: JSON.parse(JSON.stringify(storyIsPrivate)),
		});
		if (!response) return;
		if (response?.errors) return setErrors(response.errors);
		if (response?.data?.storyURL) changeLocation("/s/" + response.data.storyURL);
	}

	return {
		isDisplayingCreateStoryForm,
		closeCreateStoryForm,
		storyTitle,
		changeStoryTitle,
		storyURL,
		changeStoryURL,
		storyIsPrivate,
		toggleStoryIsPrivate,
		errors,
		submitCreateStory,
	};
};
