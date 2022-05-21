// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../context/APIContext";

// Services

// Styles

// Assets

export const BrowserContainerLogic = () => {
	const { authorized } = useContext(APIContext);

	return { authorized };
};
