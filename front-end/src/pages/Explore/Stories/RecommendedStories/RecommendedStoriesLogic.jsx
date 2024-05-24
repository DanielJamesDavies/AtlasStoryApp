// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const RecommendedStoriesLogic = () => {
	const { APIRequest } = useContext(APIContext);
	const [recommendedStories, setRecommendedStories] = useState(false);
	const nc_public_uid = "nova-cosmos-public";

	useEffect(() => {
		async function getRecommendedStories() {
			const response = await APIRequest("/story/recommended", "GET");
			if (!response || response?.errors || !response?.data?.stories) return false;
			setRecommendedStories(response.data.stories);
		}
		getRecommendedStories();
	}, [setRecommendedStories, APIRequest]);

	return { recommendedStories, nc_public_uid };
};
