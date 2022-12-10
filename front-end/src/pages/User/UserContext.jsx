import React, { createContext, useState, useContext, useEffect, useRef } from "react";

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

	const curr_username = useRef(false);
	const isGetting = useRef({ profilePicture: false, banner: false, stories: false });
	useEffect(() => {
		async function getInitial() {
			if (!user_username) return setStateToDefault();
			if (curr_username.current === user_username) return;

			const newUser = await getUser();

			// Document Title
			if (newUser?.data?.nickname) {
				document.title = newUser.data.nickname + " | User | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}

			getUserProfilePicture(newUser?.data?.profilePicture);
			getStories(newUser?.data?.stories);
			getUserBanner(newUser?.data?.banner);
		}

		function setStateToDefault() {
			setUser(false);
			setIsAuthorizedToEdit(false);
			setProfilePicture(false);
			setBanner(false);
			setStories(false);
			isGetting.current = { profilePicture: false, banner: false, stories: false };
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

		async function getUserProfilePicture(profilePictureID) {
			if (!profilePictureID || isGetting.current.profilePicture) return;
			isGetting.current.profilePicture = true;
			const response = await APIRequest("/image/" + profilePictureID, "GET");
			if (response?.error || !response?.data?.image?.image) return setProfilePicture(false);
			setProfilePicture(response.data.image.image);
		}

		async function getUserBanner(bannerID) {
			if (!bannerID || isGetting.current.banner) return;
			isGetting.current.banner = true;
			const response = await APIRequest("/image/" + bannerID, "GET");
			if (response?.error || !response?.data?.image?.image) return setBanner(false);
			setBanner(response.data.image.image);
		}

		async function getStories(storyIDs) {
			if (!storyIDs || isGetting.current.stories) return;
			isGetting.current.stories = true;
			let newStories = await Promise.all(storyIDs.map(async (storyID) => await getStory(storyID)));
			newStories = newStories.filter((e) => e !== false);
			setStories(newStories);
		}

		async function getStory(story_id) {
			let storyResponse = await APIRequest("/story/" + story_id + "?story_id=" + story_id, "GET");
			if (storyResponse?.error || !storyResponse?.data?.story || !storyResponse?.data?.story?.data?.owner) return false;
			return storyResponse.data.story;
		}

		getInitial();
		let reloadTimer = setTimeout(() => getInitial(), 1);
		return () => clearTimeout(reloadTimer);
	}, [location, user_username, curr_username, isGetting, APIRequest, setIsAuthorizedToEdit, user, setUser, setProfilePicture, setBanner]);

	return (
		<UserContext.Provider
			value={{
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
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
