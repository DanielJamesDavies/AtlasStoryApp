// Packages
import { useEffect } from "react";
import { useState } from "react";

// Components

// Logic

// Context

// Styles

// Assets

export const ContentItemLogic = ({ className, size, hasBg }) => {
	const [contentItemClassName, setContentItemClassName] = useState("content-item-loading");

	useEffect(() => {
		function getContentItemClassName() {
			let newContentItemClassName = "content-item";
			if (hasBg) newContentItemClassName += " content-item-w-bg";
			if (className) newContentItemClassName += " " + className;
			if (size) newContentItemClassName += " content-item-size-" + size;
			setContentItemClassName(newContentItemClassName);
		}
		getContentItemClassName();
	}, [setContentItemClassName, className, size, hasBg]);

	return { contentItemClassName };
};
