// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";

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

	return {
		isDisplayingCreateStoryForm,
		closeCreateStoryForm,
		storyTitle,
		changeStoryTitle,
		storyURL,
		changeStoryURL,
		storyIsPrivate,
		toggleStoryIsPrivate,
	};
};
