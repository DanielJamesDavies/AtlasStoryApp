// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharactersContext } from "../CharactersContext";

// Services

// Styles

// Assets

export const CharactersGroupsLogic = () => {
	const { groups, openGroup, setOpenGroup } = useContext(CharactersContext);

	function changeOpenGroup(newOpenGroup) {
		if (newOpenGroup === openGroup) return;
		setOpenGroup(-1);
		setTimeout(() => setOpenGroup(newOpenGroup), 1);
	}

	return { groups, openGroup, changeOpenGroup };
};
