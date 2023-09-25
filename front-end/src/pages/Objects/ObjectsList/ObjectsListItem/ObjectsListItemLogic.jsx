// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { ObjectsContext } from "../../ObjectsContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const ObjectsListItemLogic = ({ object }) => {
	const { story } = useContext(ObjectsContext);
	const { changeLocation } = useContext(RoutesContext);

	function onClick(e) {
		if (e.button === 2) return;
		e.preventDefault();
		if (story?.uid && object?.uid) changeLocation("/s/" + story.uid + "/o/" + object.uid, e.button === 1);
	}

	return { onClick };
};
