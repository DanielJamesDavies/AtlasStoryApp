// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const UserStoriesLogic = () => {
	const { isAuthorizedToEdit, user, setUser, stories, setIsDisplayingCreateStoryForm } = useContext(UserContext);
	const { APIRequest } = useContext(APIContext);

	function openCreateStoryForm() {
		setIsDisplayingCreateStoryForm(true);
	}

	// Reorder Stories
	const [isReorderingStories, setIsReorderingStories] = useState(false);

	function toggleIsReorderingStories() {
		setIsReorderingStories((oldIsReorderingStories) => !oldIsReorderingStories);
	}

	async function changeStoriesOrder(res) {
		if (res.from === undefined || res.to === undefined) return;

		let newUser = JSON.parse(JSON.stringify(user));
		if (!newUser?.data?.stories) return;

		const tempStory = newUser.data.stories.splice(res.from, 1)[0];
		newUser.data.stories.splice(res.to, 0, tempStory);
		setUser(newUser);

		await APIRequest("/user", "PATCH", {
			path: ["data", "stories"],
			newValue: newUser.data.stories,
		});
	}

	return { isAuthorizedToEdit, user, stories, openCreateStoryForm, isReorderingStories, toggleIsReorderingStories, changeStoriesOrder };
};
