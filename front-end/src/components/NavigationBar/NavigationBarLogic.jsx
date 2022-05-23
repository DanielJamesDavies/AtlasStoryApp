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
	const { APIRequest, token, username, setUsername } = useContext(APIContext);
	const { location, changeLocation } = useContext(RoutesContext);

	useEffect(() => {
		setIsOnStory(location.split("/")[1] === "s");
	}, [location]);

	useEffect(() => {
		async function getUsername() {
			const response = await APIRequest("/user/", "GET");
			if (response?.error || !response?.data?.user?.username) return;

			setUsername(response.data.user.username);
			getUserProfilePicture(response.data.user.profilePicture);
		}

		async function getUserProfilePicture(profilePictureID) {
			const response = await APIRequest("/image/" + profilePictureID, "GET");
			if (response?.error || !response?.data?.image) return;
			setProfilePicture(response.data.image);
		}

		getUsername();
	}, [token, APIRequest, setUsername, setProfilePicture]);

	function navigateToProfile() {
		if (username) changeLocation("/u/" + username);
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

	return { isOnStory, profilePicture, navigateToProfile, navigateToCharacters, navigateToSubstories, navigateToWorld };
};
