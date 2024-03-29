// Packages

// Components

// Logic
import { ContentItemLogic } from "./ContentItemLogic";

// Context

// Styles
import "./ContentItem.css";

// Assets

export const ContentItem = ({ children, innerRef, className, size, margin, hasBg, backgroundColour }) => {
	const { contentItemClassName } = ContentItemLogic({ className, size, margin, hasBg, backgroundColour });

	if (!children) return null;
	return (
		<div ref={innerRef} className={contentItemClassName}>
			{children}
		</div>
	);
};
