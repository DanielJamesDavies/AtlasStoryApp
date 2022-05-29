// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../context/RoutesContext";
import { CharactersContext } from "../CharactersContext";

// Services

// Styles

// Assets

export const CharactersGroupLogic = () => {
	const { changeLocation } = useContext(RoutesContext);
	const { isAuthorizedToModify, story, group, setIsDisplayingCreateCharacterForm, toggleIsReorderingCharacters } = useContext(CharactersContext);

	function navigateToGroup() {
		if (story?.url && group?.url) changeLocation("s/" + story.url + "/g/" + group.url);
	}

	function openCreateCharacterForm() {
		setIsDisplayingCreateCharacterForm(true);
	}

	return { isAuthorizedToModify, group, navigateToGroup, openCreateCharacterForm, toggleIsReorderingCharacters };
};
