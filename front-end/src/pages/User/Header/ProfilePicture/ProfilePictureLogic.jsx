// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../../UserContext";
import { APIContext } from "../../../../context/APIContext";
import { LightboxContext } from "../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const ProfilePictureLogic = () => {
	const { isAuthorizedToEdit, user, profilePicture, setProfilePicture } = useContext(UserContext);
	const { APIRequest, setUserProfilePicture } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	const [errors, setErrors] = useState([]);

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

	return { isAuthorizedToEdit, profilePicture, changeProfilePicture, revertProfilePicture, saveProfilePicture, onClickProfilePicture, errors };
};
