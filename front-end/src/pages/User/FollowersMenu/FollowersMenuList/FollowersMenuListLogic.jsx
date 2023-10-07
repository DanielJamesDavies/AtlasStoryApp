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

export const FollowersMenuListLogic = () => {
	const { followersMenuSubpage, userFollowing, setUserFollowing, userFollowers, setUserFollowers } = useContext(UserContext);
	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	function goToUser(username) {
		changeLocation("/u/" + username);
	}

	async function unfollowUser(e, user_id) {
		e.stopPropagation();
		let response = await APIRequest("/user-follow/" + user_id, "DELETE");
		if (!response || response?.errors) return false;
		setUserFollowing((oldUserFollowing) => {
			let newUserFollowing = JSON.parse(JSON.stringify(oldUserFollowing));
			newUserFollowing = newUserFollowing.filter((e) => e.user?._id !== user_id);
			return newUserFollowing;
		});
	}

	async function acceptUserFollow(e, user_id) {
		e.stopPropagation();
		let response = await APIRequest("/user-follow/accept/" + user_id, "PATCH");
		if (!response || response?.errors) return false;
		setUserFollowers((oldUserFollowers) => {
			let newUserFollowers = JSON.parse(JSON.stringify(oldUserFollowers));
			const index = newUserFollowers.findIndex((e) => e?.user?._id === user_id);
			if (index === -1) return newUserFollowers;
			newUserFollowers[index].userFollow.status = "confirmed";
			return newUserFollowers;
		});
	}

	async function denyUserFollow(e, user_id) {
		e.stopPropagation();
		let response = await APIRequest("/user-follow/deny/" + user_id, "PATCH");
		if (!response || response?.errors) return false;
		setUserFollowers((oldUserFollowers) => {
			let newUserFollowers = JSON.parse(JSON.stringify(oldUserFollowers));
			newUserFollowers = newUserFollowers.filter((e) => e.user?._id !== user_id);
			return newUserFollowers;
		});
	}

	async function cancelUserFollow(e, user_id) {
		e.stopPropagation();
		let response = await APIRequest("/user-follow/" + user_id, "DELETE");
		if (!response || response?.errors) return false;
		setUserFollowing((oldUserFollowing) => {
			let newUserFollowing = JSON.parse(JSON.stringify(oldUserFollowing));
			newUserFollowing = newUserFollowing.filter((e) => e.user?._id !== user_id);
			return newUserFollowing;
		});
	}

	return { followersMenuSubpage, userFollowing, userFollowers, goToUser, unfollowUser, acceptUserFollow, denyUserFollow, cancelUserFollow };
};
