// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UserContext } from "../../UserContext";

// Services

// Styles

// Assets

export const FollowersMenuButtonsLogic = () => {
	const { isAuthorizedToEdit, followersMenuSubpage, setFollowersMenuSubpage } = useContext(UserContext);

	function openFollowersPage() {
		setFollowersMenuSubpage("followers");
	}

	function openFollowingPage() {
		setFollowersMenuSubpage("following");
	}

	function openPendingPage() {
		setFollowersMenuSubpage("pending");
	}

	return { isAuthorizedToEdit, followersMenuSubpage, openFollowersPage, openFollowingPage, openPendingPage };
};
