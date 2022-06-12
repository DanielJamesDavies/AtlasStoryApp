// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./URLPreviewMessage.css";

// Assets

export const URLPreviewMessage = ({ path, label }) => {
	if (!path) return null;

	return (
		<div className='url-preview-message'>
			{label.length === 0 ? null : <div className='url-preview-message-label'>{label}</div>}
			<div className=''>https://www.atlas-story.app/{path}</div>
		</div>
	);
};
