// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const UserPrimaryBannerLogic = () => {
	const { isAuthorizedToEdit, user, banner, setBanner } = useContext(UserContext);
	const { APIRequest } = useContext(APIContext);

	async function changeBanner(image) {
		setBanner(image);
	}

	async function revertBanner() {
		if (!user?.data?.banner) return false;
		const response = await APIRequest("/image/" + user.data.banner, "GET");
		if (!response || response?.errors || !response?.data?.image) return false;
		setBanner(response.data.image);
		return true;
	}

	async function saveBanner() {
		if (!user?.data?.banner) return false;
		const response = await APIRequest("/image/" + user.data.banner, "PATCH", { newValue: banner });
		if (!response || response?.errors) return false;
		return true;
	}

	return { isAuthorizedToEdit, banner, changeBanner, revertBanner, saveBanner };
};
