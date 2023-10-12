// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { SettingsContext } from "../../../SettingsContext";
import { APIContext } from "../../../../../context/APIContext";

// Services

// Styles

// Assets

export const PasswordLogic = () => {
	const { isAuthorizedToEdit } = useContext(SettingsContext);
	const { APIRequest } = useContext(APIContext);

	const [password, setPassword] = useState("");

	async function changePassword(e) {
		setPassword(e.target.value);
	}

	const [errors, setErrors] = useState([]);

	async function savePassword() {
		setErrors([]);
		const response = await APIRequest("/user/", "PATCH", { path: ["data", "password"], newValue: password });
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, password, changePassword, savePassword, errors };
};
