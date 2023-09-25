// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { ObjectsContext } from "../ObjectsContext";

// Services

// Styles

// Assets

export const ObjectsListLogic = () => {
	const { story, objects } = useContext(ObjectsContext);
	return { story, objects };
};
