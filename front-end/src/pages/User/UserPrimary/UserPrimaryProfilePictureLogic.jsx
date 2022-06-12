// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const UserPrimaryProfilePictureLogic = () => {
	const { isAuthorizedToEdit, user, profilePicture, setProfilePicture } = useContext(UserContext);
	const { APIRequest } = useContext(APIContext);

	const [errors, setErrors] = useState([]);

	async function changeProfilePicture(image) {
		setErrors([]);
		setProfilePicture(image);
	}

	async function revertProfilePicture() {
		setErrors([]);
		if (!user?.data?.profilePicture) return false;
		const response = await APIRequest("/image/" + user.data.profilePicture, "GET");
		if (!response || response?.errors || !response?.data?.image) return false;
		setProfilePicture(response.data.image);
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
		return true;
	}

	return { isAuthorizedToEdit, profilePicture, changeProfilePicture, revertProfilePicture, saveProfilePicture, errors };
};
