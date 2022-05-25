// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../StoryContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const StoryPrimaryLogic = () => {
	const { story, members, icon, banner, isAuthorizedStoryProfile } = useContext(StoryContext);

	const { APIRequest } = useContext(APIContext);

	async function logOut() {
		await APIRequest("/story/logout", "POST");
	}

	return { story, members, icon, banner, isAuthorizedStoryProfile, logOut };
};
