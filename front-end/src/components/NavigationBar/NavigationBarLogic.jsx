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
		async function getUsername() {
			const response = await APIRequest("/user/", "GET");
			if (response?.error || !response?.data?.user?.username) {
				setProfilePicture(false);
				return;
			}
			if (response.data.user.username === username) return;

			setUsername(response.data.user.username);
			getUserProfilePicture(response.data.user?.data?.profilePicture);
		}

		async function getUserProfilePicture(profilePictureID) {
			if (!profilePictureID) return setProfilePicture(false);
			const response = await APIRequest("/image/" + profilePictureID, "GET");
			if (response?.error || !response?.data?.image) return setProfilePicture(false);
			setProfilePicture(response.data.image);
		}

		getUsername();
	}, [APIRequest, username, setUsername, setProfilePicture]);

	function navigateToProfile() {
		if (username) {
			changeLocation("/u/" + username);
		} else {
			changeLocation("/login");
		}
	}

	function navigateToSearch() {
		changeLocation("/search");
	}

	function navigateToStory() {
		if (location.split("/")[1] === "s" && location.split("/").length < 3) return;
		changeLocation("/s/" + location.split("/")[2]);
	}

	function navigateToCharacters() {
		if (location.split("/")[1] === "s" && location.split("/").length < 3) return;
		changeLocation("/s/" + location.split("/")[2] + "/characters");
	}

	function navigateToSubstories() {
		if (location.split("/")[1] === "s" && location.split("/").length < 3) return;
		changeLocation("/s/" + location.split("/")[2] + "/substories");
	}

	function navigateToWorld() {
		if (location.split("/")[1] === "s" && location.split("/").length < 3) return;
		changeLocation("/s/" + location.split("/")[2] + "/world");
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
