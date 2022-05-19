// Packages
import { useNavigate } from "react-router-dom";

// Components

// Logic

// Context

// Styles

// Assets

export const SidebarLogic = () => {
	let navigate = useNavigate();

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

	return { navigateToProfile, navigateToStories, navigateToCharacters, navigateToSubstories, navigateToWorld };
};
