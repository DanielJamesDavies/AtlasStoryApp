// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { StoryboardContext } from "../../StoryboardContext";

// Services

// Styles

// Assets

export const ContentLogic = () => {
	const { pieces } = useContext(StoryboardContext);

	const piecesRef = useRef();

	return { pieces, piecesRef };
};
