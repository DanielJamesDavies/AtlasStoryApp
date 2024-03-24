// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryboardContext } from "../../../StoryboardContext";

// Services

// Styles

// Assets

export const TabsLogic = () => {
	const { openMultiTabPane, setOpenMultiTabPane, openPieceID } = useContext(StoryboardContext);

	return { openMultiTabPane, setOpenMultiTabPane, openPieceID };
};
