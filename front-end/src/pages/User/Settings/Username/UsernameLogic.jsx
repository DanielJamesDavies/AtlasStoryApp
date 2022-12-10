// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../../UserContext";
import { APIContext } from "../../../../context/APIContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const UsernameLogic = () => {
	const { isAuthorizedToEdit, user_username, user } = useContext(UserContext);
	const { APIRequest, setUsername } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	const [username, setNewUsername] = useState(user_username);

	function changeUsername(e) {
		setNewUsername(e.target.value);
	}

	async function revertUsername() {
		if (!user_username) return false;
		setNewUsername(user.username);
	}

	const [errors, setErrors] = useState([]);

	async function saveUsername() {
		setErrors([]);
		if (!user_username) return false;
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
