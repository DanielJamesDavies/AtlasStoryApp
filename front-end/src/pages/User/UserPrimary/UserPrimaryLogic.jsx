// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";
import { APIContext } from "../../../context/APIContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const UserPrimaryLogic = () => {
	const { isAuthorizedToEdit, setIsDisplayingSettings } = useContext(UserContext);
	const { APIRequest, setUsername } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	function openSettings() {
		setIsDisplayingSettings(true);
	}

	async function logOut() {
		await APIRequest("/user/logout", "POST");
		setUsername(false);
		changeLocation("/login");
	}

	return { isAuthorizedToEdit, openSettings, logOut };
};
