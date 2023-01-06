// Packages
import { useState, useContext } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";

// Services

// Styles

// Assets

export const RegisterLogic = () => {
	// Username
	const [username, setUsername] = useState("");

	function changeUsername(e) {
		setUsername(e.target.value);
	}

	// Nickname
	const [nickname, setNickname] = useState("");

	function changeNickname(e) {
		setNickname(e.target.value);
	}

	// Email
	const [email, setEmail] = useState("");

	function changeEmail(e) {
		setEmail(e.target.value);
	}

	// Password
	const [password, setPassword] = useState("");

	function changePassword(e) {
		setPassword(e.target.value);
	}

	// Submit
	const { APIRequest } = useContext(APIContext);
	const [errors, setErrors] = useState([]);
	const [hasCompletedRegistration, setHasCompletedRegistration] = useState(false);

	const submitNewUser = async () => {
		setErrors([]);
		const response = await APIRequest("/user", "POST", { username, nickname, email, password });
		if (response?.errors) return setErrors(response.errors);
		setHasCompletedRegistration(true);
	};

	return {
		username,
		changeUsername,
		nickname,
		changeNickname,
		email,
		changeEmail,
		password,
		changePassword,
		errors,
		submitNewUser,
		hasCompletedRegistration,
	};
};
