// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UserContext } from "../UserContext";

// Services

// Styles

// Assets

export const BlockedMessageLogic = () => {
	const { user_username, hasBeenBlockedByUser } = useContext(UserContext);

	return { user_username, hasBeenBlockedByUser };
};
