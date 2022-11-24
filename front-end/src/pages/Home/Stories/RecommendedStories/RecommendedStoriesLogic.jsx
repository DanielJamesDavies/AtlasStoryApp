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

	useEffect(() => {
		async function getRecommendedStories() {
			setRecommendedStories([]);
		}
		getRecommendedStories();
	}, [setRecommendedStories]);

	return { recommendedStories };
};
