// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const RegisterBtnLogic = () => {
	const { changeLocation } = useContext(RoutesContext);

	function goToRegisterPage() {
		changeLocation("/register");
	}

	return { goToRegisterPage };
};
