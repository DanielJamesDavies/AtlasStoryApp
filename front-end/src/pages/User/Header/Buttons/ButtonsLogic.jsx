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
	const { isAuthorizedToEdit, user, isFollowingUser, setIsFollowingUser, hasBlockedUser, setHasBlockedUser } = useContext(UserContext);
	const { APIRequest, setUserID, setUsername, setUserProfilePicture } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	function openSettings() {
		changeLocation("/settings");
	}

	async function logOut() {
		await APIRequest("/user/logout", "POST");
		setUserID(false);
		setUsername(false);
		setUserProfilePicture(false);
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

	return { isAuthorizedToEdit, user, openSettings, logOut, followUser, blockUser, isFollowingUser, hasBlockedUser };
};
