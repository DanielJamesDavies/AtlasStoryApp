// Packages
import { useEffect, useState, useContext } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

// Styles

// Assets

export const NavigationBarLogic = () => {
	const [isOnStory, setIsOnStory] = useState(false);
	const [profilePicture, setProfilePicture] = useState(false);
	const { APIRequest, username, setUsername } = useContext(APIContext);
	const { location, changeLocation } = useContext(RoutesContext);

	useEffect(() => {
		setIsOnStory(location.split("/")[1] === "s");
	}, [location]);

	useEffect(() => {
		async function getInitial() {
			const user = await getUser();
			const profilePicture = await getProfilePicture(user?.data?.profilePicture);

			if (user?.username && user.username !== username) setUsername(user.username);
			setProfilePicture(profilePicture);
		}

		async function getUser() {
			const response = await APIRequest("/user/", "GET");
			if (!response || response?.errors) return false;
			return response?.data?.user;
		}

		async function getProfilePicture(profilePictureID) {
			if (!profilePictureID) return false;
			const response = await APIRequest("/image/" + profilePictureID, "GET");
			if (response?.error || !response?.data?.image) return false;
			return response.data.image;
		}

		getInitial();
	}, [APIRequest, username, setUsername, setProfilePicture]);

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
		profilePicture,
		navigateToProfile,
		navigateToSearch,
		navigateToStory,
		navigateToCharacters,
		navigateToSubstories,
		navigateToWorld,
	};
};
