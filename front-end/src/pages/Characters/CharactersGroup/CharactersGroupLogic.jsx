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

	function navigateToGroup(e) {
		if (story?.uid && group?.uid) changeLocation("/s/" + story.uid + "/g/" + group.uid, e.button === 1);
	}

	function openCreateCharacterForm() {
		setIsDisplayingCreateCharacterForm(true);
	}

	return { isAuthorizedToEdit, story, group, navigateToGroup, openCreateCharacterForm, toggleIsReorderingCharacters };
};
