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

export const IsPrivateLogic = () => {
	const { user, setUser } = useContext(SettingsContext);
	const { APIRequest } = useContext(APIContext);

	const [errors, setErrors] = useState([]);

	async function toggleIsPrivate() {
		setErrors([]);

		let newUser = JSON.parse(JSON.stringify(user));
		newUser.isPrivate = newUser?.isPrivate ? false : true;
		setUser(newUser);

		const response = await APIRequest("/user/", "PATCH", { newValue: newUser?.isPrivate, path: ["isPrivate"] });
		if (response?.errors) return setErrors(response.errors);
		return true;
	}

	return { user, errors, toggleIsPrivate };
};
