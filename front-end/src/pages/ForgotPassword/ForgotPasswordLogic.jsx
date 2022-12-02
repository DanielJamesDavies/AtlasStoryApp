// Packages
import { useState, useContext } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";

// Services

// Styles

// Assets

export const ForgotPasswordLogic = () => {
	const { APIRequest } = useContext(APIContext);
	const [errors, setErrors] = useState([]);

	const [hasForgotPasswordEmailSent, setHasForgotPasswordEmailSent] = useState(false);

	const [email, setEmail] = useState("");
	function changeEmail(e) {
		setEmail(e.target.value);
	}

	async function submitForgotPasswordRequest() {
		const response = await APIRequest("/user/forgot-password", "POST", { email });
		if (!response || response?.errors) return setErrors(response.errors);
		setHasForgotPasswordEmailSent(true);
	}

	return { errors, hasForgotPasswordEmailSent, email, changeEmail, submitForgotPasswordRequest };
};
