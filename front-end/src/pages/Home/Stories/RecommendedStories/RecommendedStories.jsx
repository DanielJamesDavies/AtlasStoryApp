// Packages

// Components

// Logic
import { RecommendedStoriesLogic } from "./RecommendedStoriesLogic";

// Context

// Services

// Styles
import "./RecommendedStories.css";

// Assets

export const RecommendedStories = () => {
	const { recommendedStories } = RecommendedStoriesLogic();

	if (recommendedStories?.length === 0) return null;
	return (
		<div className='home-stories-recommended-container'>
			<div className='home-stories-recommended-title'>Recommended Stories</div>
		</div>
	);
};
