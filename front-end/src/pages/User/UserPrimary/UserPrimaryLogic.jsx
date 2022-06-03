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
	const { isAuthorizedToEdit, user, profilePicture, banner } = useContext(UserContext);
	const { APIRequest, setUsername } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	async function logOut() {
		await APIRequest("/user/logout", "POST");
		setUsername(false);
		changeLocation("/login");
	}

	return { isAuthorizedToEdit, user, profilePicture, banner, logOut };
};
