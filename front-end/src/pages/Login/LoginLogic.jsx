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

export const LoginLogic = () => {
	// Username
	const [username, setUsernameValue] = useState("");

	function changeUsername(e) {
		setUsernameValue(e.target.value);
	}

	// Password
	const [password, setPassword] = useState("");

	function changePassword(e) {
		setPassword(e.target.value);
	}

	// Submit
	const { APIRequest, setUsername } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [errors, setErrors] = useState([]);

	async function submitLoginUser() {
		setIsLoggingIn(true);
		setErrors([]);
		const response = await APIRequest("/user/login", "POST", { username, password });
		setIsLoggingIn(false);
		if (response?.errors) return setErrors(response.errors);

		if (!response?.data?.username) return;
		changeLocation("/u/" + response.data.username);
		setUsername(response.data.username);
	}

	// Forgot Password
	const [hasForgotPassword, setHasForgotPassword] = useState(false);
	function forgotPassword() {
		setHasForgotPassword(true);
	}

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

	return {
		username,
		changeUsername,
		password,
		changePassword,
		isLoggingIn,
		errors,
		submitLoginUser,
		hasForgotPassword,
		forgotPassword,
		hasForgotPasswordEmailSent,
		email,
		changeEmail,
		submitForgotPasswordRequest,
	};
};
