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

export const DeleteLogic = () => {
	const { isAuthorizedToEdit, setIsAuthorizedToEdit, isDisplayingSettings, setIsDisplayingSettings } = useContext(UserContext);
	const { APIRequest, setCookiesConsent, setUsername } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

	const [errors, setErrors] = useState([]);

	async function deleteUser() {
		setErrors([]);
		const response = await APIRequest("/user/", "DELETE");
		if (response?.errors) return setErrors(response.errors);
		setCookiesConsent(false);
		setUsername(false);
		setIsDisplayingSettings(false);
		setIsAuthorizedToEdit(false);
		changeLocation("/");
	}

	return { isAuthorizedToEdit, isDisplayingSettings, errors, deleteUser };
};
