// Packages

// Components

// Logic
import { ContentLogic } from "./ContentLogic";

// Context

// Services

// Styles
import "./Content.css";

// Assets

export const Content = ({ content_item }) => {
	const { onDragStart, onDragEnd } = ContentLogic({ content_item });

	return (
		<div
			className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-item'
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			draggable
		>
			<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-item-preview'></div>
			<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-item-name'>{content_item?.name}</div>
		</div>
	);
};
