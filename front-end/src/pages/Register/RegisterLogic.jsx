// Packages
import { useRef, useState, useContext } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";

// Services
import getImageFromFile from "../../services/GetImageFromFile";

// Styles

// Assets

export const RegisterLogic = () => {
	// Profile Picture
	const profilePictureInputRef = useRef();
	const [profilePicture, setProfilePicture] = useState(false);

	async function changeProfilePicture(e) {
		if (e.target.files.length === 0) return false;
		const image = await getImageFromFile(e.target.files[0]);
		profilePictureInputRef.current.value = [];
		if (image?.error || !image?.data) return;
		setProfilePicture(image.data);
	}

	// Banner
	const bannerInputRef = useRef();
	const [banner, setBanner] = useState(false);

	async function changeBanner(e) {
		if (e.target.files.length === 0) return false;
		const image = await getImageFromFile(e.target.files[0]);
		bannerInputRef.current.value = [];
		if (image?.error || !image?.data) return;
		setBanner(image.data);
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
	const { APIRequest } = useContext(APIContext);
	const [errors, setErrors] = useState([]);
	const [hasCompletedRegistration, setHasCompletedRegistration] = useState(false);

	const submitNewUser = async () => {
		setErrors([]);
		const response = await APIRequest("/user", "POST", { username, nickname, email, password, profilePicture, banner });
		if (response?.errors) return setErrors(response.errors);
		setHasCompletedRegistration(true);
	};

	return {
		profilePictureInputRef,
		profilePicture,
		changeProfilePicture,
		bannerInputRef,
		banner,
		changeBanner,
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
