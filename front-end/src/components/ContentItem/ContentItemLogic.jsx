// Packages
import { useEffect } from "react";
import { useState } from "react";

// Components

// Logic

// Context

// Styles

// Assets

export const ContentItemLogic = ({ className, size, margin, hasBg, backgroundColour }) => {
	const [contentItemClassName, setContentItemClassName] = useState("content-item-loading");

	useEffect(() => {
		function getContentItemClassName() {
			let newContentItemClassName = "content-item";
			if (hasBg) newContentItemClassName += " content-item-w-bg";
			if (className) newContentItemClassName += " " + className;
			if (size) newContentItemClassName += " content-item-size-" + size;
			switch (margin) {
				case "none":
					newContentItemClassName += " content-item-margin-none";
					break;
				default:
					break;
			}
			switch (backgroundColour) {
				case "grey1":
					newContentItemClassName += " content-item-bg-grey-1";
					break;
				case "grey2":
					newContentItemClassName += " content-item-bg-grey-2";
					break;
				case "grey3":
					newContentItemClassName += " content-item-bg-grey-3";
					break;
				case "grey4":
					newContentItemClassName += " content-item-bg-grey-4";
					break;
				case "grey5":
					newContentItemClassName += " content-item-bg-grey-5";
					break;
				default:
					break;
			}
			setContentItemClassName(newContentItemClassName);
		}
		getContentItemClassName();
	}, [setContentItemClassName, className, size, margin, hasBg, backgroundColour]);

	return { contentItemClassName };
};
