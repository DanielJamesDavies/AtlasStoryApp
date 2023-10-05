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
	const [isDisplayingSettings, setIsDisplayingSettings] = useState(false);
	const [isDisplayingCreateStoryForm, setIsDisplayingCreateStoryForm] = useState(false);
	const [isFollowingUser, setIsFollowingUser] = useState(false);
	const [hasBlockedUser, setHasBlockedUser] = useState(false);
	const [hasBeenBlockedByUser, setHasBeenBlockedByUser] = useState(false);

	const curr_username = useRef(false);
	const authorized_user_images = useRef({ profilePicture: userProfilePicture, banner: userBanner });
	useEffect(() => {
		async function getInitial() {
			if (!user_username) return setStateToDefault();
			if (curr_username.current === user_username) return;

			getIsFollowingUser(user_username);
			getUserBlockedStatus(user_username);
			const newUser = await getUser();

			// Document Title
			updateDocumentTitle(newUser);
			setTimeout(() => updateDocumentTitle(newUser), 1000);

			getUserProfilePicture(newUser?.data?.profilePicture, newUser.username);
			getUserBanner(newUser?.data?.banner, newUser.username);
			getStories(newUser?.data?.stories);
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
		}

		async function getUser() {
			const response = await APIRequest("/user?username=" + user_username, "GET");
			if (!response || response?.error || !response?.data?.user) {
				setStateToDefault();
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
			let response = await APIRequest("/user-block?username=" + user_username, "GET");
			if (response?.error) return false;
			setHasBlockedUser(response?.data?.hasBlockedUser);
			setHasBeenBlockedByUser(response?.data?.hasBeenBlockedByUser);
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
				isDisplayingSettings,
				setIsDisplayingSettings,
				isDisplayingCreateStoryForm,
				setIsDisplayingCreateStoryForm,
				isFollowingUser,
				setIsFollowingUser,
				hasBlockedUser,
				setHasBlockedUser,
				hasBeenBlockedByUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
