import React, { createContext, useState, useContext, useEffect, useRef } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

export const UserContext = createContext();

const UserProvider = ({ children, user_username }) => {
	const { APIRequest, username, userProfilePicture, setUserProfilePicture, userBanner, setUserBanner } = useContext(APIContext);
	const { location, changeLocationParameters } = useContext(RoutesContext);
	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);
	const [profilePicture, setProfilePicture] = useState(false);
	const [user, setUser] = useState(false);
	const [banner, setBanner] = useState(false);
	const [stories, setStories] = useState(false);
	const [isDisplayingCreateStoryForm, setIsDisplayingCreateStoryForm] = useState(false);
	const [isFollowingUser, setIsFollowingUser] = useState(false);
	const [isUserPrivate, setIsUserPrivate] = useState(false);
	const [hasSentFollowRequest, setHasSentFollowRequest] = useState(false);
	const [hasBlockedUser, setHasBlockedUser] = useState(false);
	const [hasBeenBlockedByUser, setHasBeenBlockedByUser] = useState(false);
	const [userFollowing, setUserFollowing] = useState(false);
	const [userFollowers, setUserFollowers] = useState(false);
	const [isDisplayingFollowersMenu, setIsDisplayingFollowersMenu] = useState(false);
	const [followersMenuSubpage, setFollowersMenuSubpage] = useState("following");

	const curr_username = useRef(false);
	const authorized_user_images = useRef({ profilePicture: userProfilePicture, banner: userBanner });
	useEffect(() => {
		async function getInitial() {
			if (!user_username) return setStateToDefault();
			if (curr_username.current === user_username) return false;
			setStateToDefault();

			getIsFollowingUser(user_username);
			getUserBlockedStatus(user_username);

			const newUser = await getUser();

			// Document Title
			updateDocumentTitle(newUser);
			setTimeout(() => updateDocumentTitle(newUser), 1000);

			getUserProfilePicture(newUser?.data?.profilePicture, newUser.username);
			getUserBanner(newUser?.data?.banner, newUser.username);
			getStories(newUser?.data?.stories);
			getUserFollowing(newUser?._id);
			getUserFollowers(newUser?._id);
		}

		function updateDocumentTitle(newUser) {
			if (newUser?.data?.nickname) {
				document.title = newUser.data.nickname + " | User | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		function setStateToDefault() {
			setUser(false);
			setIsAuthorizedToEdit(false);
			setProfilePicture(false);
			setBanner(false);
			setStories(false);
			setIsUserPrivate(false);
			setHasBlockedUser(false);
			setHasBeenBlockedByUser(false);
			setUserFollowing(false);
			setUserFollowers(false);
			setIsDisplayingFollowersMenu(false);
		}

		async function getUser() {
			const url_username = window.location.href.split("?")[0].split("/").pop();
			const response = await APIRequest("/user?username=" + url_username, "GET");
			if (!response || response?.error || !response?.data?.user) {
				setStateToDefault();
				setIsUserPrivate(
					response?.errors?.filter(
						(e) => e.message === "Not Following Private User" || e.message === "Private User Follow Request Pending"
					)?.length !== 0
				);
				setHasSentFollowRequest(response?.errors?.filter((e) => e.message === "Private User Follow Request Pending")?.length !== 0);
				return false;
			}
			curr_username.current = response?.data?.user?.username;
			setIsAuthorizedToEdit(response?.data?.isAuthorizedToEdit);
			setUser(response?.data?.user);
			return response?.data?.user;
		}

		async function getUserProfilePicture(profilePictureID, newUsername) {
			if (!profilePictureID) return;
			if (newUsername === username) setProfilePicture(authorized_user_images?.current?.profilePicture);
			const response = await APIRequest("/image/" + profilePictureID, "GET");
			if (response?.error || !response?.data?.image?.image) return setProfilePicture("NO_IMAGE");
			setProfilePicture(response.data.image.image);
			if (newUsername === username) setUserProfilePicture(response.data.image.image);
		}

		async function getUserBanner(bannerID, newUsername) {
			if (!bannerID) return;
			if (newUsername === username) setBanner(authorized_user_images?.current?.banner);
			const response = await APIRequest("/image/" + bannerID, "GET");
			if (response?.error || !response?.data?.image?.image) return setBanner("NO_IMAGE");
			setBanner(response.data.image.image);
			if (newUsername === username) setUserBanner(response.data.image.image);
		}

		async function getStories(storyIDs) {
			if (!storyIDs) return;
			let newStories = await Promise.all(storyIDs.map(async (storyID) => await getStory(storyID)));
			newStories = newStories.filter((e) => e !== false);
			setStories(newStories);
		}

		async function getStory(story_id) {
			let storyResponse = await APIRequest("/story/" + story_id + "?story_id=" + story_id, "GET");
			if (storyResponse?.error || !storyResponse?.data?.story || !storyResponse?.data?.story?.data?.owner) return false;
			return storyResponse.data.story;
		}

		async function getIsFollowingUser(user_username) {
			if (user_username === username) return false;
			let response = await APIRequest("/user-follow?username=" + user_username, "GET");
			if (response?.error || response?.data?.isFollowing === undefined) return false;
			setIsFollowingUser(response?.data?.isFollowing);
		}

		async function getUserBlockedStatus(user_username) {
			if (user_username === username) return false;
			let response = await APIRequest("/user-block/status?username=" + user_username, "GET");
			if (response?.error) return false;
			setHasBlockedUser(response?.data?.hasBlockedUser);
			setHasBeenBlockedByUser(response?.data?.hasBeenBlockedByUser);
		}

		async function getUserFollowing(user_id) {
			let response = await APIRequest("/user-follow/following/" + user_id, "GET");
			if (response?.error) return false;
			setUserFollowing(response?.data?.following);
		}

		async function getUserFollowers(user_id) {
			let response = await APIRequest("/user-follow/followers/" + user_id, "GET");
			if (response?.error) return false;
			setUserFollowers(response?.data?.followers);
		}

		getInitial();
	}, [
		location,
		username,
		user_username,
		curr_username,
		authorized_user_images,
		APIRequest,
		setIsAuthorizedToEdit,
		user,
		setUser,
		setProfilePicture,
		setUserProfilePicture,
		setBanner,
		setUserBanner,
		setIsFollowingUser,
		setHasBlockedUser,
		setHasBeenBlockedByUser,
		setIsUserPrivate,
	]);

	useEffect(() => {
		changeLocationParameters([]);
	}, [changeLocationParameters]);

	return (
		<UserContext.Provider
			value={{
				authorized_username: username,
				user_username,
				isAuthorizedToEdit,
				setIsAuthorizedToEdit,
				user,
				setUser,
				profilePicture,
				setProfilePicture,
				banner,
				setBanner,
				stories,
				setStories,
				isDisplayingCreateStoryForm,
				setIsDisplayingCreateStoryForm,
				isFollowingUser,
				setIsFollowingUser,
				isUserPrivate,
				setIsUserPrivate,
				hasSentFollowRequest,
				setHasSentFollowRequest,
				hasBlockedUser,
				setHasBlockedUser,
				hasBeenBlockedByUser,
				userFollowing,
				setUserFollowing,
				userFollowers,
				setUserFollowers,
				isDisplayingFollowersMenu,
				setIsDisplayingFollowersMenu,
				followersMenuSubpage,
				setFollowersMenuSubpage,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
