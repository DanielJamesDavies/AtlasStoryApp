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
				{type === "playlist" || type === "track" ? (
					content_item?.album?.images?.[0]?.url ? (
						<img src={content_item?.album?.images?.[0]?.url} alt='' draggable={false} />
					) : content_item?.images?.[0]?.url ? (
						<img src={content_item?.images?.[0]?.url} alt='' draggable={false} />
					) : null
				) : null}
				{type === "image" ? content_item?.image ? <img src={content_item?.image} alt='' draggable={false} /> : null : null}
				<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-item-delete-btn' onClick={deleteContentItem}>
					<FontAwesomeIcon icon={faTimes} />
				</div>
			</div>
			<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-item-name'>{content_item?.name}</div>
			{!["playlist", "track"].includes(type) ? null : (
				<div className='unit-page-storyboard-editor-multi-tab-pane-content-media-section-list-item-type'>
					{type?.charAt(0)?.toUpperCase() + type?.slice(1)}
				</div>
			)}
		</div>
	);
};
