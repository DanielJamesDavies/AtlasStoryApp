// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../context/RoutesContext";

// Styles

// Assets

export const UnauthorizedNavigationBarLogic = () => {
	const { changeLocation } = useContext(RoutesContext);

	function navigateToLanding() {
		changeLocation("/");
	}

	function navigateToExplore() {
		changeLocation("/explore");
	}

	function navigateToLogin() {
		changeLocation("/login");
	}

	function navigateToRegister() {
		changeLocation("/register");
	}

	return { navigateToLanding, navigateToExplore, navigateToLogin, navigateToRegister };
};
