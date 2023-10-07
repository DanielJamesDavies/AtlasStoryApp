// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";

// Services

// Styles

// Assets

export const FollowersMenuLogic = () => {
	const { isDisplayingFollowersMenu, setIsDisplayingFollowersMenu } = useContext(UserContext);

	function closeFollowersMenu() {
		setIsDisplayingFollowersMenu(false);
	}

	return { isDisplayingFollowersMenu, closeFollowersMenu };
};
