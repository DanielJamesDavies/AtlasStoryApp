// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";

// Services

// Styles

// Assets

export const UserStoriesLogic = () => {
	const { stories, isAuthorizedUserProfile, setIsDisplayingCreateStoryForm } = useContext(UserContext);

	function openCreateStoryForm() {
		setIsDisplayingCreateStoryForm(true);
	}

	return { stories, isAuthorizedUserProfile, openCreateStoryForm };
};
