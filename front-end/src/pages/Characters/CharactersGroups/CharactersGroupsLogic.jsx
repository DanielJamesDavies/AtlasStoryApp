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
	const { isAuthorizedToModify, groups, openGroup, setOpenGroup, setIsDisplayingCreateGroupForm } = useContext(CharactersContext);

	function changeOpenGroup(newOpenGroup) {
		if (newOpenGroup === openGroup) return;
		setOpenGroup(-1);
		setTimeout(() => setOpenGroup(newOpenGroup), 1);
	}

	function openCreateGroupForm() {
		setIsDisplayingCreateGroupForm(true);
	}

	return { isAuthorizedToModify, groups, openGroup, changeOpenGroup, openCreateGroupForm };
};
