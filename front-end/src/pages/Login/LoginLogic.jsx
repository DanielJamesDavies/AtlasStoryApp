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
	const [username, setUsername] = useState("");

	function changeUsername(e) {
		setUsername(e.target.value);
	}

	// Password
	const [password, setPassword] = useState("");

	function changePassword(e) {
		setPassword(e.target.value);
	}

	// Submit
	const { APIRequest } = useContext(APIContext);
	const { changeLocation } = useContext(RoutesContext);
	const [errors, setErrors] = useState([]);

	const submitLoginUser = async () => {
		setErrors([]);
		const response = await APIRequest("/user/login", "POST", { username, password });
		if (response.errors) return setErrors(response.errors);

		if (!response?.data?.username) return;
		changeLocation("/user/" + response.data.username);
	};

	return { username, changeUsername, password, changePassword, errors, submitLoginUser };
};
