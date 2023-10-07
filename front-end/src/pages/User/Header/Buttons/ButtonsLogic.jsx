// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UserContext } from "../../UserContext";
import { APIContext } from "../../../../context/APIContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const ButtonsLogic = () => {
	const {
		isAuthorizedToEdit,
		user,
		setIsDisplayingSettings,
		isFollowingUser,
		setIsFollowingUser,
		hasBlockedUser,
		setHasBlockedUser,
		userFollowing,
		userFollowers,
		setIsDisplayingFollowersMenu,
		setFollowersMenuSubpage,
	} = useContext(UserContext);
	const { APIRequest, setUsername } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	function openSettings() {
		setIsDisplayingSettings(true);
	}

	async function logOut() {
		await APIRequest("/user/logout", "POST");
		setUsername(false);
		changeLocation("/login");
	}

	async function followUser() {
		if (!user?._id) return false;
		if (!isFollowingUser) {
			let response = await APIRequest("/user-follow/" + user?._id, "POST");
			if (!response || response?.errors || !response?.data?.userFollow?._id) return false;
			setIsFollowingUser(true);
		} else {
			let response = await APIRequest("/user-follow/" + user?._id, "DELETE");
			if (!response || response?.errors) return false;
			setIsFollowingUser(false);
		}
	}

	async function blockUser() {
		if (!user?._id) return false;
		if (!hasBlockedUser) {
			let response = await APIRequest("/user-block/" + user?._id, "POST");
			if (!response || response?.errors || !response?.data?.userBlock?._id) return false;
			setHasBlockedUser(true);
		} else {
			let response = await APIRequest("/user-block/" + user?._id, "DELETE");
			if (!response || response?.errors) return false;
			setHasBlockedUser(false);
		}
	}

	function openFollowing() {
		setIsDisplayingFollowersMenu(true);
		setFollowersMenuSubpage("following");
	}

	function openFollowers() {
		setIsDisplayingFollowersMenu(true);
		setFollowersMenuSubpage("followers");
	}

	return {
		isAuthorizedToEdit,
		user,
		userFollowing,
		userFollowers,
		openSettings,
		logOut,
		followUser,
		blockUser,
		isFollowingUser,
		hasBlockedUser,
		openFollowing,
		openFollowers,
	};
};
