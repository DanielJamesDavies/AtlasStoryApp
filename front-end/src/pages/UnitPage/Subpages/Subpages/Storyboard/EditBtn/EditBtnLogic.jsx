// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { StoryboardContext } from "../StoryboardContext";

// Services

// Styles

// Assets

export const EditBtnLogic = () => {
	const { isAuthorizedToEdit } = useContext(UnitPageContext);
	const { setIsEditingStoryboard } = useContext(StoryboardContext);

	function onClick() {
		setIsEditingStoryboard(true);
	}

	return { isAuthorizedToEdit, onClick };
};
