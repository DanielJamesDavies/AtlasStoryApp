// Packages
import { useState, useContext } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";
import { RoutesContext } from "../../context/RoutesContext";

// Services

// Styles

// Assets

export const ChangeForgottenPasswordLogic = ({ username, email, verificationCode }) => {
	const { APIRequest, setUsername } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [password, setPassword] = useState("");
	const [hasChanged, setHasChanged] = useState(false);
	const [errors, setErrors] = useState([]);

	function changePassword(e) {
		setPassword(e.target.value);
	}

	async function submitNewPassword() {
		setUsername(false);
		setErrors([]);
		const response = await APIRequest("/user/forgotten-password", "PATCH", { username, email, password, verificationCode });
		if (response?.errors) return setErrors(response.errors);

		setHasChanged(true);
		setTimeout(() => {
			changeLocation("/login");
		}, 1000);
	}

	return { hasChanged, errors, password, changePassword, submitNewPassword };
};
