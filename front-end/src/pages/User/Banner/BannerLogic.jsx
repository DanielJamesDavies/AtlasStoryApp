// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";
import { APIContext } from "../../../context/APIContext";
import { LightboxContext } from "../../../context/LightboxContext";

// Services

// Styles

// Assets

export const BannerLogic = () => {
	const { isAuthorizedToEdit, user, banner, setBanner } = useContext(UserContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	const [errors, setErrors] = useState([]);

	async function changeBanner(image) {
		setErrors([]);
		setBanner(image);
	}

	async function revertBanner() {
		setErrors([]);
		if (!user?.data?.banner) return false;
		const response = await APIRequest("/image/" + user.data.banner, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setBanner(response.data.image.image);
		return true;
	}

	async function saveBanner() {
		setErrors([]);
		if (!user?.data?.banner) return false;
		const response = await APIRequest("/image/" + user.data.banner, "PATCH", { newValue: banner });
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	function onClickBanner() {
		setLightboxImageIDs([user?.data?.banner]);
		setLightboxIndex(0);
	}

	return { isAuthorizedToEdit, banner, changeBanner, revertBanner, saveBanner, onClickBanner, errors };
};
