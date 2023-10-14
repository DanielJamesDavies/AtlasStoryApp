// Packages
import { useContext, useRef, useState } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";
import { APIContext } from "../../../context/APIContext";
import { LightboxContext } from "../../../context/LightboxContext";

// Services
import getImageFromFile from "../../../services/GetImageFromFile";

// Styles

// Assets

export const BannerLogic = () => {
	const { isAuthorizedToEdit, authorized_username, user, banner, setBanner } = useContext(UserContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);
	const firstBannerInputRef = useRef();

	const [errors, setErrors] = useState([]);

	async function addFirstBanner(e) {
		if (!user?.data?.banner) return false;
		const image = await getImageFromFile(e.target.files[0]);
		firstBannerInputRef.current.value = [];
		if (image?.error || !image?.data) return setErrors([{ message: image?.error }]);
		setErrors([]);
		setBanner(image.data);
		const response = await APIRequest("/image/" + user.data.banner, "PATCH", { newValue: image.data });
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	async function changeBanner(image) {
		setErrors([]);
		setBanner(image);
	}

	async function removeBanner() {
		setErrors([]);
		setBanner(undefined);
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

	return {
		isAuthorizedToEdit,
		authorized_username,
		user,
		banner,
		addFirstBanner,
		changeBanner,
		removeBanner,
		revertBanner,
		saveBanner,
		onClickBanner,
		errors,
		firstBannerInputRef,
	};
};
