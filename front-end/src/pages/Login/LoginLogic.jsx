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
	const { APIRequest, setUsername } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);

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

	// Forgot Password
	function forgotPassword() {
		changeLocation("/forgot-password");
	}

	// Submit
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

	return { username, changeUsername, password, changePassword, forgotPassword, isLoggingIn, errors, submitLoginUser };
};
