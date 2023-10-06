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

export const PrivateUserMessageLogic = () => {
	const { user_username, isUserPrivate, hasSentFollowRequest, setHasSentFollowRequest } = useContext(UserContext);
	const { APIRequest } = useContext(APIContext);

	async function sendFollowRequest() {
		let response = await APIRequest("/user-follow?username=" + user_username, "POST");
		if (!response || response?.errors || !response?.data?.userFollow?._id) return false;
		setHasSentFollowRequest(true);
	}

	return { user_username, isUserPrivate, hasSentFollowRequest, sendFollowRequest };
};
