// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LoreContext } from "../../LoreContext";

// Services

// Styles

// Assets

export const LoreListPrimaryLogic = () => {
	const { isAuthorizedToEdit, setIsDisplayingCreateLoreItemForm, toggleIsReorderingLore } = useContext(LoreContext);

	function openCreateLoreItemForm() {
		setIsDisplayingCreateLoreItemForm(true);
	}

	return { isAuthorizedToEdit, openCreateLoreItemForm, toggleIsReorderingLore };
};
