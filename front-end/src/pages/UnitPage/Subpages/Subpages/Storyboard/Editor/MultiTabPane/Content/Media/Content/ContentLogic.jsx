// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { StoryboardContext } from "../../../../../StoryboardContext";

// Services

// Styles

// Assets

export const ContentLogic = ({ content_item, type }) => {
	const { setFromMediaDraggingContent, setFromMediaDraggingContentID } = useContext(StoryboardContext);

	function onDragStart() {
		if (!["playlist"].includes(type)) setFromMediaDraggingContent({ id: content_item?.id, type, content_item });
	}

	function onDragEnd() {
		if (!["playlist"].includes(type)) {
			setFromMediaDraggingContent(false);
			setFromMediaDraggingContentID(false);
		}
	}

	return { onDragStart, onDragEnd };
};
