// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const UserSettingsEmailLogic = () => {
	const { isAuthorizedToEdit, user, setUser } = useContext(UserContext);
	const { APIRequest } = useContext(APIContext);

	async function changeEmail(e) {
		setUser((oldUser) => {
			let newUser = JSON.parse(JSON.stringify(oldUser));
			newUser.email = e.target.value;
			return newUser;
		});
	}

	async function revertEmail() {
		const response = await APIRequest("/user/", "GET");
		if (!response || response?.errors || !response?.data?.user?.email) return false;
		setUser((oldUser) => {
			let newUser = JSON.parse(JSON.stringify(oldUser));
			newUser.email = response.data.user.email;
			return newUser;
		});
		return true;
	}

	const [errors, setErrors] = useState([]);
	const [hasSentEmailVerification, setHasSentEmailVerification] = useState(false);

	async function saveEmail() {
		setErrors([]);
		if (!user?.email) return false;
		const response = await APIRequest("/user/", "PATCH", { path: ["email"], newValue: user.email });
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		setHasSentEmailVerification(true);
		return true;
	}

	return { isAuthorizedToEdit, user, changeEmail, revertEmail, saveEmail, errors, hasSentEmailVerification };
};
