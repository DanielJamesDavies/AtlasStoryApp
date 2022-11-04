// Packages
import { useState, useEffect, useContext } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const FeedItemLogic = ({ feedItem }) => {
	const [contentTypeText, setContentTypeText] = useState("");
	const { changeLocation } = useContext(RoutesContext);

	useEffect(() => {
		async function getContentTypeText() {
			let newContentTypeText = "";
			switch (feedItem?.content?.content_type) {
				case "user":
					newContentTypeText = "User";
					break;
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

	function onClickTitle() {
		let newLocation = "";
		switch (feedItem?.content?.content_type) {
			case "user":
				newLocation = "/u/" + feedItem?.content?.username;
				break;
			case "story":
				newLocation = "/s/" + feedItem?.content?.uid;
				break;
			case "group":
				newLocation = "/s/" + feedItem?.content?.story?.uid + "/g/" + feedItem?.content?.uid;
				break;
			case "character_type":
				newLocation = "/s/" + feedItem?.content?.story?.uid + "/characters";
				break;
			case "character":
				newLocation = "/s/" + feedItem?.content?.story?.uid + "/c/" + feedItem?.content?.uid;
				break;
			case "substory":
				newLocation = "/s/" + feedItem?.content?.story?.uid + "/s/" + feedItem?.content?.uid;
				break;
			default:
				break;
		}
		changeLocation(newLocation);
	}

	function onClickStory() {
		if (feedItem?.content?.story?.uid) changeLocation("/s/" + feedItem?.content?.story?.uid);
	}

	function onClickAuthor() {
		if (feedItem?.content?.author?.username) changeLocation("/u/" + feedItem?.content?.author?.username);
	}

	return { contentTypeText, onClickTitle, onClickStory, onClickAuthor };
};
