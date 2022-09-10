// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SubstoriesContext } from "../SubstoriesContext";

// Services

// Styles

// Assets

export const SubstoriesListPrimaryLogic = () => {
	const { isAuthorizedToEdit, setIsDisplayingCreateSubstoryForm, toggleIsReorderingSubstories } = useContext(SubstoriesContext);

	function openCreateSubstoryForm() {
		setIsDisplayingCreateSubstoryForm(true);
	}

	return { isAuthorizedToEdit, openCreateSubstoryForm, toggleIsReorderingSubstories };
};
