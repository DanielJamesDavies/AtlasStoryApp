// Packages
import { useEffect } from "react";
import { useState, useContext } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const FeedLogic = () => {
	const [feedItems, setFeedItems] = useState(false);
	const { APIRequest } = useContext(APIContext);

	useEffect(() => {
		async function getFeedItems() {
			let newFeedItems = [];
			setFeedItems(newFeedItems);
		}
		getFeedItems();
	}, [setFeedItems, APIRequest]);

	return { feedItems };
};
