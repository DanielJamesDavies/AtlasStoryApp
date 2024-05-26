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
	const { setFromMediaDraggingContent, fromMediaDraggingContentID, setContentImages, pieces, setPieces, setLayers } =
		useContext(StoryboardContext);

	function onDragStart() {
		setFromMediaDraggingContent({ id: content_item?.id, type, content_item });
	}

	function onDragEnd() {
		setFromMediaDraggingContent(false);
		fromMediaDraggingContentID.current = false;
	}

	function deleteContentItem() {
		switch (type) {
			case "image":
				setContentImages((oldValue) => oldValue.filter((e) => e?.id !== content_item?.id));

				const new_pieces = JSON.parse(JSON.stringify(pieces));
				const pieces_to_delete = new_pieces.filter((e) => e?.content === content_item?.id)?.map((e) => e?.id);
				setPieces(new_pieces.filter((e) => e?.content !== content_item?.id));

				setLayers((oldValue) => {
					return oldValue.map((layer) => {
						let new_layer = JSON.parse(JSON.stringify(layer));
						new_layer.pieces = new_layer.pieces.filter((e) => !pieces_to_delete.includes(e));
						return new_layer;
					});
				});
				break;
			default:
				break;
		}
	}

	return { onDragStart, onDragEnd, deleteContentItem };
};
