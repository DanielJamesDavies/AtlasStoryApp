// Packages
import { useNavigate } from "react-router-dom";

// Components

// Logic

// Context

// Styles

// Assets

export const UnauthorizedNavigationBarLogic = () => {
	let navigate = useNavigate();

	function navigateToLanding() {
		navigate("/");
	}

	function navigateToLogin() {
		navigate("/login");
	}

	function navigateToRegister() {
		navigate("/register");
	}

	return { navigateToLanding, navigateToLogin, navigateToRegister };
};
