// Packages
import { useEffect, useState, useContext } from "react";

// Components

// Logic

// Context
import { AppContext } from "../../context/AppContext";
import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

// Styles

// Assets

export const NavigationBarLogic = () => {
	const [isOnStory, setIsOnStory] = useState(false);
	const { setUITheme, setFontSizeMultiplier } = useContext(AppContext);
	const { APIRequest, username, setUsername, userProfilePicture, setUserProfilePicture } = useContext(APIContext);
	const { location, changeLocation } = useContext(RoutesContext);
	const [storyIcon, setStoryIcon] = useState(false);

	useEffect(() => {
		setIsOnStory(location.split("/")[1] === "s");
	}, [location]);

	useEffect(() => {
		async function getUser() {
			const response = await APIRequest("/user/", "GET");
			if (!response || response?.errors || !response?.data?.user) return false;

			const user = response.data.user;
			if (user?.username && user.username !== username) setUsername(user.username);
			if (user?.data?.uiTheme) setUITheme(user.data.uiTheme);
			if (user?.data?.fontSizeMultiplier) {
				const newFontSizeMultiplier = Number(user.data.fontSizeMultiplier);
				setFontSizeMultiplier(isNaN(newFontSizeMultiplier) ? 1 : newFontSizeMultiplier);
			}

			getUserProfilePicture(user?.data?.profilePicture);

			return response?.data?.user;
		}

		async function getUserProfilePicture(userProfilePictureID) {
			if (!userProfilePictureID) return false;
			const response = await APIRequest("/image/" + userProfilePictureID, "GET");
			if (response?.error || !response?.data?.image) return false;
			setUserProfilePicture(response.data.image);
			return response.data.image;
		}

		getUser();
	}, [APIRequest, username, setUsername, setUITheme, setFontSizeMultiplier, setUserProfilePicture]);

	useEffect(() => {
		async function getStory() {
			const locationSplit = location.split("/");
			if (locationSplit.length < 3 || locationSplit[1] !== "s") return setStoryIcon(false);
			const response = await APIRequest("/story?uid=" + locationSplit[2], "GET");
			if (response?.error || !response?.data?.story || locationSplit[2] !== response?.data?.story?.uid) return setStoryIcon(false);
			const story = response.data.story;
			getStoryIcon(story?.data?.icon);
		}

		async function getStoryIcon(storyIconID) {
			if (!storyIconID) return false;
			const response = await APIRequest("/image/" + storyIconID, "GET");
			if (response?.error || !response?.data?.image) return setStoryIcon(false);
			setStoryIcon(response.data.image);
			return response.data.image;
		}

		getStory();
	}, [APIRequest, location, setStoryIcon]);

	function navigateToProfile(e) {
		if (username) {
			changeLocation("/u/" + username, e.button === 1);
		} else {
			changeLocation("/login", e.button === 1);
		}
	}

	function navigateToSearch(e) {
		changeLocation("/search", e.button === 1);
	}

	function navigateToStory(e) {
		if (location.split("/")[1] === "s" && location.split("/").length < 3) return;
		changeLocation("/s/" + location.split("/")[2], e.button === 1);
	}

	function navigateToCharacters(e) {
		if (location.split("/")[1] === "s" && location.split("/").length < 3) return;
		changeLocation("/s/" + location.split("/")[2] + "/characters", e.button === 1);
	}

	function navigateToSubstories(e) {
		if (location.split("/")[1] === "s" && location.split("/").length < 3) return;
		changeLocation("/s/" + location.split("/")[2] + "/substories", e.button === 1);
	}

	function navigateToWorld(e) {
		if (location.split("/")[1] === "s" && location.split("/").length < 3) return;
		changeLocation("/s/" + location.split("/")[2] + "/world", e.button === 1);
	}

	return {
		isOnStory,
		userProfilePicture,
		storyIcon,
		navigateToProfile,
		navigateToSearch,
		navigateToStory,
		navigateToCharacters,
		navigateToSubstories,
		navigateToWorld,
	};
};
