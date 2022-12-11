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

export const HeaderLogic = () => {
	const { isAuthorizedToEdit, story } = useContext(StoryContext);
	const { user_id } = useContext(APIContext);

	return { isAuthorizedToEdit, user_id, story };
};
