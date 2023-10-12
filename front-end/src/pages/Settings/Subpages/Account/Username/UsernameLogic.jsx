// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { SettingsContext } from "../../../SettingsContext";
import { APIContext } from "../../../../../context/APIContext";
import { RoutesContext } from "../../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const UsernameLogic = () => {
	const { isAuthorizedToEdit, auth_username, user } = useContext(SettingsContext);
	const { APIRequest, setUsername } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	const [username, setNewUsername] = useState(auth_username);

	useEffect(() => {
		setNewUsername(auth_username);
	}, [auth_username]);

	function changeUsername(e) {
		setNewUsername(e.target.value);
	}

	async function revertUsername() {
		if (!auth_username) return false;
		setNewUsername(user.username);
	}

	const [errors, setErrors] = useState([]);

	async function saveUsername() {
		setErrors([]);
		if (!auth_username) return false;
		const newUsername = username.split(" ").join("_");
		const response = await APIRequest("/user", "PATCH", { path: ["username"], newValue: newUsername });
		if (!response || response?.errors || !response?.data?.user?.username) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		setUsername(response.data.user.username);
		setNewUsername(response.data.user.username);
		changeLocation("/u/" + response.data.user.username);
		return true;
	}

	return { isAuthorizedToEdit, username, errors, changeUsername, revertUsername, saveUsername };
};
