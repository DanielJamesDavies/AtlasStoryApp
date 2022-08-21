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
	const { setUITheme } = useContext(AppContext);
	const { APIRequest, username, setUsername, userProfilePicture, setUserProfilePicture } = useContext(APIContext);
	const { location, changeLocation } = useContext(RoutesContext);

	useEffect(() => {
		setIsOnStory(location.split("/")[1] === "s");
	}, [location]);

	useEffect(() => {
		async function getInitial() {
			const user = await getUser();
			const userProfilePicture = await getUserProfilePicture(user?.data?.profilePicture);

			if (user?.username && user.username !== username) setUsername(user.username);
			if (user?.data?.uiTheme) setUITheme(user.data.uiTheme);
			setUserProfilePicture(userProfilePicture);
		}

		async function getUser() {
			const response = await APIRequest("/user/", "GET");
			if (!response || response?.errors) return false;
			return response?.data?.user;
		}

		async function getUserProfilePicture(userProfilePictureID) {
			if (!userProfilePictureID) return false;
			const response = await APIRequest("/image/" + userProfilePictureID, "GET");
			if (response?.error || !response?.data?.image) return false;
			return response.data.image;
		}

		getInitial();
	}, [APIRequest, username, setUsername, setUITheme, setUserProfilePicture]);

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
		navigateToProfile,
		navigateToSearch,
		navigateToStory,
		navigateToCharacters,
		navigateToSubstories,
		navigateToWorld,
	};
};
