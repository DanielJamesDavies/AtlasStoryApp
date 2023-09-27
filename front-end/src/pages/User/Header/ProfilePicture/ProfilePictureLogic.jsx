// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { UserContext } from "../../UserContext";
import { APIContext } from "../../../../context/APIContext";
import { LightboxContext } from "../../../../context/LightboxContext";

// Services
import getImageFromFile from "../../../../services/GetImageFromFile";

// Styles

// Assets

export const ProfilePictureLogic = () => {
	const { isAuthorizedToEdit, authorized_username, user, profilePicture, setProfilePicture } = useContext(UserContext);
	const { APIRequest, setUserProfilePicture } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);
	const firstProfilePictureInputRef = useRef();

	const [errors, setErrors] = useState([]);

	async function addFirstProfilePicture(e) {
		if (!user?.data?.profilePicture) return false;
		const image = await getImageFromFile(e.target.files[0]);
		firstProfilePictureInputRef.current.value = [];
		if (image?.error || !image?.data) return setErrors([{ message: image?.error }]);
		setErrors([]);
		setProfilePicture(image.data);
		const response = await APIRequest("/image/" + user.data.profilePicture, "PATCH", { newValue: image.data });
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	async function changeProfilePicture(image) {
		setErrors([]);
		setProfilePicture(image);
	}

	async function revertProfilePicture() {
		setErrors([]);
		if (!user?.data?.profilePicture) return false;
		const response = await APIRequest("/image/" + user.data.profilePicture, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setProfilePicture(response.data.image.image);
		return true;
	}

	async function saveProfilePicture() {
		setErrors([]);
		if (!user?.data?.profilePicture) return false;
		const response = await APIRequest("/image/" + user.data.profilePicture, "PATCH", { newValue: profilePicture });
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		setUserProfilePicture(profilePicture);
		return true;
	}

	function onClickProfilePicture() {
		setLightboxImageIDs([user?.data?.profilePicture]);
		setLightboxIndex(0);
	}

	return {
		isAuthorizedToEdit,
		authorized_username,
		user,
		profilePicture,
		firstProfilePictureInputRef,
		addFirstProfilePicture,
		changeProfilePicture,
		revertProfilePicture,
		saveProfilePicture,
		onClickProfilePicture,
		errors,
	};
};
