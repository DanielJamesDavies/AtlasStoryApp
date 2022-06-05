// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";
import { APIContext } from "../../../context/APIContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const UserSettingsUsernameLogic = () => {
	const { isAuthorizedToEdit, user } = useContext(UserContext);
	const { APIRequest, setUsername } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	const [username, setNewUsername] = useState(user?.username);

	function changeUsername(e) {
		setNewUsername(e.target.value);
	}

	async function revertUsername() {
		if (!user?.username) return false;
		setNewUsername(user.username);
	}

	async function saveUsername() {
		if (!user?.username) return false;
		const newUsername = username.split(" ").join("_");
		const response = await APIRequest("/user", "PATCH", { path: ["username"], newValue: newUsername });
		if (!response || response?.errors || !response?.data?.user?.username) return false;
		setUsername(response.data.user.username);
		setNewUsername(response.data.user.username);
		changeLocation("/u/" + response.data.user.username);
		return true;
	}

	return { isAuthorizedToEdit, username, changeUsername, revertUsername, saveUsername };
};
