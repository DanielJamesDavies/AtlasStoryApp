// Packages
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";

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
	const [errors, setErrors] = useState([]);
	let navigate = useNavigate();

	const submitLoginUser = async () => {
		setErrors([]);
		const response = await APIRequest("/user/login", "POST", { username, password });
		if (response.errors) return setErrors(response.errors);

		if (!response?.data?.username) return;
		navigate("/user/" + response.data.username);
	};

	return { username, changeUsername, password, changePassword, errors, submitLoginUser };
};
