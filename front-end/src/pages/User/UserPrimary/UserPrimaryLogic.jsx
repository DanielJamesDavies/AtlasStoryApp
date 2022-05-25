// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const UserPrimaryLogic = () => {
	const { user, profilePicture, banner, isAuthorizedUserProfile } = useContext(UserContext);
	const { APIRequest } = useContext(APIContext);

	async function logOut() {
		await APIRequest("/user/logout", "POST");
	}

	return { user, profilePicture, banner, isAuthorizedUserProfile, logOut };
};
