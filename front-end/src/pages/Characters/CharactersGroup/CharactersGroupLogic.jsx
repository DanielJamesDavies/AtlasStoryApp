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
	const { isAuthorizedToEdit, story, group, setIsDisplayingCreateCharacterForm, toggleIsReorderingCharacters } = useContext(CharactersContext);

	function navigateToGroup() {
		if (story?.uid && group?.uid) changeLocation("s/" + story.uid + "/g/" + group.uid);
	}

	function openCreateCharacterForm() {
		setIsDisplayingCreateCharacterForm(true);
	}

	return { isAuthorizedToEdit, group, navigateToGroup, openCreateCharacterForm, toggleIsReorderingCharacters };
};
