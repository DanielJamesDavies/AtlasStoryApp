// Packages
import { useState, useContext, useEffect } from "react";

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
			const response = await APIRequest("/feed", "GET");
			if (!response || response?.errors || !response?.data?.feedItems) return false;
			setFeedItems(response.data.feedItems);
		}
		getFeedItems();
	}, [setFeedItems, APIRequest]);

	return { feedItems };
};
