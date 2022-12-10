// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../../UserContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const DeleteLogic = () => {
	const { isAuthorizedToEdit, setIsAuthorizedToEdit, isDisplayingSettings, setIsDisplayingSettings } = useContext(UserContext);
	const { APIRequest, setCookiesConsent, setUsername } = useContext(APIContext);

	const [errors, setErrors] = useState([]);

	async function deleteUser() {
		setErrors([]);
		const response = await APIRequest("/user/", "DELETE");
		if (response?.errors) return setErrors(response.errors);
		setCookiesConsent(false);
		setUsername(false);
		setIsDisplayingSettings(false);
		setIsAuthorizedToEdit(false);
	}

	return { isAuthorizedToEdit, isDisplayingSettings, errors, deleteUser };
};
