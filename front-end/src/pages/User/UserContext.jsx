import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

export const UserContext = createContext();

const UserProvider = ({ children, user_username }) => {
	const [isAuthorizedToModify, setIsAuthorizedToModify] = useState(false);
	const [user, setUser] = useState(false);
	const [profilePicture, setProfilePicture] = useState(false);
	const [banner, setBanner] = useState(false);
	const [stories, setStories] = useState(false);
	const [isDisplayingCreateStoryForm, setIsDisplayingCreateStoryForm] = useState(false);
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);

	useEffect(() => {
		let reloadTimer = setTimeout(() => getUser(), 1);

		async function getUser() {
			if (!user_username) return setUser(false);
			if (user.username === user_username) return;

			// User Data
			const response = await APIRequest("/user?username=" + user_username, "GET");
			if (!response?.data?.user || response?.error) {
				setUser(false);
				setProfilePicture(false);
				setBanner(false);
				setIsAuthorizedToModify(false);
				return;
			}

			setIsAuthorizedToModify(response.data?.isAuthorizedToModify);

			if (user_username === response.data.user.username) setUser(response.data.user);

			if (response.data.user?.profilePicture) getUserProfilePicture(response.data.user.profilePicture);
			if (response.data.user?.stories) getStories(response.data.user.stories);
			if (response.data.user?.banner) getUserBanner(response.data.user.banner);
		}

		async function getUserProfilePicture(profilePictureID) {
			const response = await APIRequest("/image/" + profilePictureID, "GET");
			if (response?.error || !response?.data?.image) return setProfilePicture(false);
			setProfilePicture(response.data.image);
		}

		async function getUserBanner(bannerID) {
			const response = await APIRequest("/image/" + bannerID, "GET");
			if (response?.error || !response?.data?.image) return setBanner(false);
			setBanner(response.data.image);
		}

		async function getStories(storyIDs) {
			let newStories = await Promise.all(storyIDs.map(async (storyID) => await getStory(storyID)));
			newStories = newStories.filter((e) => e !== false);
			setStories(newStories);
		}

		async function getStory(storyID) {
			let storyResponse = await APIRequest("/story/" + storyID, "GET");
			if (storyResponse?.error || !storyResponse?.data?.story || !storyResponse?.data?.story?.data?.owner) return false;
			return storyResponse.data.story;
		}

		if (user.username !== user_username) getUser();

		return () => {
			clearTimeout(reloadTimer);
		};
	}, [location, user_username, APIRequest, setIsAuthorizedToModify, user, setUser, setProfilePicture, setBanner]);

	return (
		<UserContext.Provider
			value={{
				isAuthorizedToModify,
				user,
				setUser,
				profilePicture,
				banner,
				stories,
				setStories,
				isDisplayingCreateStoryForm,
				setIsDisplayingCreateStoryForm,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
