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

export const EditorLogic = () => {
	const { isAuthorizedToEdit } = useContext(UnitPageContext);
	const { isEditingStoryboard } = useContext(StoryboardContext);

	function onScroll(e) {
		e?.stopPropagation();
	}

	return { isAuthorizedToEdit, isEditingStoryboard, onScroll };
};
