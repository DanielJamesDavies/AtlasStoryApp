// Packages
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";

// Styles

// Assets

export const NavigationBarLogic = () => {
	const [isOnStory, setIsOnStory] = useState(false);
	const [username, setUsername] = useState(false);
	const [profilePicture, setProfilePicture] = useState(false);
	const { APIRequest, token } = useContext(APIContext);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setIsOnStory(location.pathname.split("/")[1] === "story");
	}, [location]);

	useEffect(() => {
		async function getUsername() {
			const response = await APIRequest("/user/", "GET");
			if (response?.error || !response?.data?.username) return;

			setUsername(response.data.username);
			getUserProfilePicture(response.data.profilePicture);
		}

		async function getUserProfilePicture(profilePictureID) {
			const response = await APIRequest("/image/" + profilePictureID, "GET");
			if (response?.error || !response?.data?.image) return;
			setProfilePicture(response.data.image);
		}

		getUsername();
	}, [token, APIRequest, setUsername, setProfilePicture]);

	async function navigateToProfile() {
		navigate("/user/" + username);
		await APIRequest("/user/logout", "POST");
	}

	function navigateToStories() {
		navigate("/stories");
	}

	function navigateToCharacters() {
		if (location.pathname.split("/")[1] === "story" && location.pathname.split("/").length < 3) return;
		navigate("/story/" + location.pathname.split("/")[2] + "/characters");
	}

	function navigateToSubstories() {
		if (location.pathname.split("/")[1] === "story" && location.pathname.split("/").length < 3) return;
		navigate("/story/" + location.pathname.split("/")[2] + "/substories");
	}

	function navigateToWorld() {
		if (location.pathname.split("/")[1] === "story" && location.pathname.split("/").length < 3) return;
		navigate("/story/" + location.pathname.split("/")[2] + "/world");
	}

	return { isOnStory, profilePicture, navigateToProfile, navigateToStories, navigateToCharacters, navigateToSubstories, navigateToWorld };
};
