import React, { createContext, useState, useContext, useEffect } from "react";

import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

export const UserContext = createContext();

const UserProvider = ({ children, user_username }) => {
	const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);
	const [user, setUser] = useState(false);
	const [profilePicture, setProfilePicture] = useState(false);
	const [banner, setBanner] = useState(false);
	const [stories, setStories] = useState(false);
	const [isDisplayingSettings, setIsDisplayingSettings] = useState(false);
	const [isDisplayingCreateStoryForm, setIsDisplayingCreateStoryForm] = useState(false);
	const { APIRequest } = useContext(APIContext);
	const { location } = useContext(RoutesContext);

	useEffect(() => {
		let reloadTimer = setTimeout(() => getUser(), 1);

		async function getUser() {
			if (user.username === user_username) return;
			setUser(false);
			setProfilePicture(false);
			setBanner(false);
			setIsAuthorizedToEdit(false);
			if (!user_username) return;

			// User Data
			const response = await APIRequest("/user?username=" + user_username, "GET");
			if (!response?.data?.user || response?.error) {
				setUser(false);
				setProfilePicture(false);
				setBanner(false);
				setIsAuthorizedToEdit(false);
				return;
			}

			setIsAuthorizedToEdit(response.data?.isAuthorizedToEdit);

			if (user_username === response?.data?.user?.username) setUser(response.data.user);

			// Document Title
			if (response?.data?.user?.data?.nickname) {
				document.title = response.data.user.data.nickname + " | User | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}

			getUserProfilePicture(response.data.user?.data?.profilePicture);
			getStories(response.data.user?.data?.stories);
			getUserBanner(response.data.user?.data?.banner);
		}

		async function getUserProfilePicture(profilePictureID) {
			if (!profilePictureID) return;
			const response = await APIRequest("/image/" + profilePictureID, "GET");
			if (response?.error || !response?.data?.image?.image) return setProfilePicture(false);
			setProfilePicture(response.data.image.image);
		}

		async function getUserBanner(bannerID) {
			if (!bannerID) return;
			const response = await APIRequest("/image/" + bannerID, "GET");
			if (response?.error || !response?.data?.image?.image) return setBanner(false);
			setBanner(response.data.image.image);
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

		if (user.username !== user_username) getUser();

		return () => {
			clearTimeout(reloadTimer);
		};
	}, [location, user_username, APIRequest, setIsAuthorizedToEdit, user, setUser, setProfilePicture, setBanner]);

	return (
		<UserContext.Provider
			value={{
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
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
