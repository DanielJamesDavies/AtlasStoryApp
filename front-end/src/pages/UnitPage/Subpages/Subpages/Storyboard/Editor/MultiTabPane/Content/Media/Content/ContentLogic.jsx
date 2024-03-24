// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryboardContext } from "../../../../../StoryboardContext";

// Services

// Styles

// Assets

export const ContentLogic = ({ content_item }) => {
	const { setFromMediaDraggingContent, setFromMediaDraggingContentID } = useContext(StoryboardContext);

	function onDragStart() {
		setFromMediaDraggingContent(content_item?.id);
	}

	function onDragEnd() {
		setFromMediaDraggingContent(false);
		setFromMediaDraggingContentID(false);
	}

	return { onDragStart, onDragEnd };
};
