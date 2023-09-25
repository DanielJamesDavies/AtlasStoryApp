// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LoreContext } from "../../LoreContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const LoreListItemLogic = ({ lore_item }) => {
	const { story } = useContext(LoreContext);
	const { changeLocation } = useContext(RoutesContext);

	function onClick(e) {
		if (e.button === 2) return;
		e.preventDefault();
		if (story?.uid && lore_item?.uid) changeLocation("/s/" + story.uid + "/li/" + lore_item.uid, e.button === 1);
	}

	return { onClick };
};
