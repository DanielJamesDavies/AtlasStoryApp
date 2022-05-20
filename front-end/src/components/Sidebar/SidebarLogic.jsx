// Packages
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Components

// Logic

// Context

// Styles

// Assets

export const SidebarLogic = () => {
	const [isOnStory, setIsOnStory] = useState(false);

	let navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setIsOnStory(location.pathname.split("/")[1] === "story");
	}, [location]);

	function navigateToProfile() {
		navigate("/profile");
	}

	function navigateToStories() {
		navigate("/stories");
	}

	function navigateToCharacters() {
		navigate("/characters");
	}

	function navigateToSubstories() {
		navigate("/substories");
	}

	function navigateToWorld() {
		navigate("/world");
	}

	return { isOnStory, navigateToProfile, navigateToStories, navigateToCharacters, navigateToSubstories, navigateToWorld };
};
