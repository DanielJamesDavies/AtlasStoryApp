// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../context/RoutesContext";
import { CharactersContext } from "../CharactersContext";

// Services
import getColourWithTint from "../../../services/GetColourWithTint";

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

	const [activeGroupColour, setActiveGroupColour] = useState(false);
	const [activeGroupColourTint, setActiveGroupColourTint] = useState(false);

	useEffect(() => {
		if (group?.data?.colour) {
			try {
				const colours = getColourWithTint(group?.data?.colour);
				setActiveGroupColour(colours[0]);
				setActiveGroupColourTint(colours[1]);
			} catch {
				setActiveGroupColour(group?.data?.colour);
				setActiveGroupColourTint(group?.data?.colour);
			}
		}
	}, [group]);

	return {
		isAuthorizedToEdit,
		story,
		group,
		navigateToGroup,
		openCreateCharacterForm,
		toggleIsReorderingCharacters,
		activeGroupColour,
		activeGroupColourTint,
	};
};
