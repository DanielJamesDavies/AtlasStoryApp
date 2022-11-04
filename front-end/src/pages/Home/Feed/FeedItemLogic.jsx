// Packages
import { useState, useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const FeedItemLogic = ({ feedItem }) => {
	const [contentTypeText, setContentTypeText] = useState("");

	useEffect(() => {
		async function getContentTypeText() {
			let newContentTypeText = "";
			switch (feedItem?.content?.content_type) {
				case "story":
					newContentTypeText = "Story";
					break;
				case "group":
					newContentTypeText = "Group";
					break;
				case "character_type":
					newContentTypeText = "Character Type";
					break;
				case "character":
					newContentTypeText = "Character";
					break;
				case "substory":
					newContentTypeText = "Substory";
					break;
				default:
					break;
			}
			setContentTypeText(newContentTypeText);
		}
		getContentTypeText();
	}, [setContentTypeText, feedItem]);

	return { contentTypeText };
};
