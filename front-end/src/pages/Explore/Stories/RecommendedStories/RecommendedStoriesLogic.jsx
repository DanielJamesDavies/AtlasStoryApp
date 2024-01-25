// Packages
import { useContext, useState, useEffect, useRef, useCallback } from "react";

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
			const response = await APIRequest("/story/recommended", "GET");
			if (!response || response?.errors || !response?.data?.stories) return false;
			setRecommendedStories(response.data.stories);
		}
		getRecommendedStories();
	}, [setRecommendedStories, APIRequest]);

	const popularStoriesRef = useRef();
	const storyItemSizeRef = useRef();
	const [extraStoryItemSpaces, setExtraStoryItemSpaces] = useState([]);

	const updateExtraStoryItemSpaces = useCallback(() => {
		try {
			const popularStoriesRefWidth = popularStoriesRef?.current?.clientWidth;
			const storyItemSizeRefWidth = storyItemSizeRef?.current?.clientWidth;

			const stories_per_row = popularStoriesRefWidth / (storyItemSizeRefWidth + 10.2);

			let extraStoryItemSpacesCount =
				(1 - (recommendedStories.length / stories_per_row - Math.floor(recommendedStories.length / stories_per_row))) * stories_per_row;
			extraStoryItemSpacesCount -= Math.floor(extraStoryItemSpacesCount % 2);

			extraStoryItemSpacesCount = Math.floor(extraStoryItemSpacesCount);

			setExtraStoryItemSpaces(Array(extraStoryItemSpacesCount).fill());
		} catch {}
	}, [setExtraStoryItemSpaces, popularStoriesRef, storyItemSizeRef, recommendedStories]);

	useEffect(() => {
		const interval = setInterval(() => updateExtraStoryItemSpaces(), 20);
		setTimeout(() => clearInterval(interval), 500);
		window.addEventListener("resize", updateExtraStoryItemSpaces);
		return () => window.removeEventListener("resize", updateExtraStoryItemSpaces);
	}, [updateExtraStoryItemSpaces, recommendedStories]);

	return { recommendedStories, popularStoriesRef, storyItemSizeRef, extraStoryItemSpaces };
};
