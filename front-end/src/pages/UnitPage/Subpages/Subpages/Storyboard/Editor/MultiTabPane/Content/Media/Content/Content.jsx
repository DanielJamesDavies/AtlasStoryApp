// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Components

// Logic
import { ContentLogic } from "./ContentLogic";

// Context

// Services

// Styles
import "./Content.css";

// Assets

export const Content = ({ content_item, type }) => {
	const { onDragStart, onDragEnd, deleteContentItem } = ContentLogic({ content_item, type });

	return (
		<div
			className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-item'
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			draggable={true}
		>
			<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-item-preview'>
				{type === "image" ? (
					content_item?.image ? (
						<img src={content_item?.image} alt='' draggable={false} />
					) : null
				) : content_item?.icon !== undefined ? (
					<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-item-preview-icon-container'>
						<FontAwesomeIcon icon={content_item?.icon} />
					</div>
				) : null}
				<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-item-delete-btn' onClick={deleteContentItem}>
					<FontAwesomeIcon icon={faTimes} />
				</div>
			</div>
			<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-item-name'>{content_item?.name}</div>
		</div>
	);
};
