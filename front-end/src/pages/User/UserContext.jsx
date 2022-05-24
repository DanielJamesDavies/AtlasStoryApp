import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

export const UserContext = createContext();

const UserProvider = ({ children, user_username }) => {
	const [user, setUser] = useState(false);
	const [profilePicture, setProfilePicture] = useState(false);
	const [stories, setStories] = useState(false);
	const [isAuthorizedUserProfile, setIsAuthorizedUserProfile] = useState(false);
	const [isDisplayingCreateStoryForm, setIsDisplayingCreateStoryForm] = useState(false);
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);

	useEffect(() => {
		let reloadTimer = setTimeout(() => getUser(), 1);

		async function getUser() {
			if (user.username === user_username) return;
			if (!user_username) return setUser(false);

			// User Data
			const response = await APIRequest("/user/?username=" + user_username, "GET");
			if (!response?.data?.user || response?.error) {
				setUser(false);
				setProfilePicture(false);
				setIsAuthorizedUserProfile(false);
				return;
			}

			setIsAuthorizedUserProfile(response.data?.isAuthorizedUser);

			if (user_username === response.data.user.username) setUser(response.data.user);

			// Profile Picture Data
			await getUserProfilePicture(response.data.user.profilePicture);
			await getStories(response.data.user.stories);
		}

		async function getUserProfilePicture(profilePictureID) {
			const response = await APIRequest("/image/" + profilePictureID, "GET");
			if (response?.error || !response?.data?.image) return setProfilePicture(false);
			setProfilePicture(response.data.image);
		}

		async function getStories(storyIDs) {
			let newStories = await Promise.all(storyIDs.map(async (storyID) => await getStory(storyID)));
			newStories = newStories.filter((e) => e !== false);
			setStories(newStories);
		}

		async function getStory(storyID) {
			let storyResponse = await APIRequest("/story/" + storyID, "GET");
			if (storyResponse?.error || !storyResponse?.data?.story || !storyResponse?.data?.story.owner) return false;
			return storyResponse.data.story;
		}

		if (user.username !== user_username) getUser();

		return () => {
			clearTimeout(reloadTimer);
		};
	}, [location, user_username, APIRequest, user, setUser, setProfilePicture]);

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				profilePicture,
				stories,
				setStories,
				isAuthorizedUserProfile,
				isDisplayingCreateStoryForm,
				setIsDisplayingCreateStoryForm,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
