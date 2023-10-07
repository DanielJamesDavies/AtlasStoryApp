// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UserContext } from "../../UserContext";

// Services

// Styles

// Assets

export const FollowersLogic = () => {
	const { user, userFollowing, userFollowers, setIsDisplayingFollowersMenu, setFollowersMenuSubpage } = useContext(UserContext);

	function openFollowing() {
		setIsDisplayingFollowersMenu(true);
		setFollowersMenuSubpage("following");
	}

	function openFollowers() {
		setIsDisplayingFollowersMenu(true);
		setFollowersMenuSubpage("followers");
	}

	return { user, userFollowing, userFollowers, openFollowing, openFollowers };
};
