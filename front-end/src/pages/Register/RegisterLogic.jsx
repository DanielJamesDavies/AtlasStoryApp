// Packages
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";

// Services

// Styles

// Assets

export const RegisterLogic = () => {
	// Profile Picture
	const profilePictureInputRef = useRef();
	const [profilePicture, setProfilePicture] = useState("");

	function changeProfilePicture(e) {
		if (e.target.files.length === 0) return false;

		const fr = new FileReader();

		fr.readAsDataURL(e.target.files[0]);

		fr.onload = () => {
			profilePictureInputRef.current.value = [];

			let image = new Image();
			image.onload = async () => {
				let imageLength = fr.result.split(",")[1].split("=")[0].length;
				let imageSize = Math.floor(imageLength - (imageLength / 8) * 2);
				if (imageSize > 1500000) return;

				setProfilePicture(fr.result);
			};

			image.src = fr.result;
		};

		fr.onerror = (error) => {
			return console.log(error);
		};
	}

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
	const { APIRequest, setToken } = useContext(APIContext);
	const [errors, setErrors] = useState([]);
	let navigate = useNavigate();

	const submitNewUser = async () => {
		setErrors([]);
		const response = await APIRequest("/user", "POST", { username, nickname, email, password, profilePicture });
		if (response.errors) setErrors(response.errors);

		if (!response?.data?.token || !response?.data?.username) return;
		setToken(response.data.token);
		navigate("/user/" + response.data.username);
	};

	return {
		profilePictureInputRef,
		profilePicture,
		changeProfilePicture,
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
	};
};
