// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { ObjectsContext } from "../../ObjectsContext";

// Services

// Styles

// Assets

export const ObjectsListPrimaryLogic = () => {
	const { isAuthorizedToEdit, setIsDisplayingCreateObjectForm, toggleIsReorderingObjects } = useContext(ObjectsContext);

	function openCreateObjectForm() {
		setIsDisplayingCreateObjectForm(true);
	}

	return { isAuthorizedToEdit, openCreateObjectForm, toggleIsReorderingObjects };
};
