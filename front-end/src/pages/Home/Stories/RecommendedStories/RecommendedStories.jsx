// Packages

// Components
import { StoryItem } from "../../../../components/StoryItem/StoryItem";
import { CarouselContainer } from "../../../../components/CarouselContainer/CarouselContainer";
import { LoadingCircle } from "../../../../components/LoadingCircle/LoadingCircle";

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
			{!recommendedStories ? (
				<div className='home-stories-recommended-loading-circle-container'>
					<LoadingCircle center={true} size='s' />
				</div>
			) : (
				<CarouselContainer speed={1}>
					<div className='home-stories-recommended-list'>
						{recommendedStories.map((story, index) => (
							<div key={index} className='home-stories-recommended-list-item-container'>
								<StoryItem story={story} size='m' />
							</div>
						))}
					</div>
				</CarouselContainer>
			)}
		</div>
	);
};
