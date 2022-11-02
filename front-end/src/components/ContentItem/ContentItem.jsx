// Packages

// Components

// Logic
import { ContentItemLogic } from "./ContentItemLogic";

// Context

// Styles
import "./ContentItem.css";

// Assets

export const ContentItem = ({ children, className, size, hasBg }) => {
	const { contentItemClassName } = ContentItemLogic({ className, size, hasBg });

	if (!children) return null;
	return <div className={contentItemClassName}>{children}</div>;
};
