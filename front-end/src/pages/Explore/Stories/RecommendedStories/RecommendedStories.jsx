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

export const RecommendedStories = ({ isAuthorized }) => {
	const { recommendedStories, popularStoriesRef, storyItemSizeRef, extraStoryItemSpaces } = RecommendedStoriesLogic();

	if (recommendedStories?.length === 0) return null;
	return (
		<div className='home-stories-recommended-container'>
			<div className='home-stories-recommended-title'>{isAuthorized ? "Recommended Stories" : "Popular Stories"}</div>
			{!recommendedStories ? (
				<div className='home-stories-recommended-loading-circle-container'>
					<LoadingCircle center={true} size='s' />
				</div>
			) : isAuthorized ? (
				<CarouselContainer speed={0.7} buttonScroll={true}>
					<div className='home-stories-recommended-list'>
						{recommendedStories.map((story, index) => (
							<div key={index} className='home-stories-recommended-list-item-container'>
								<StoryItem story={story} size='m' />
							</div>
						))}
					</div>
				</CarouselContainer>
			) : (
				<div ref={popularStoriesRef} className='home-stories-popular-list'>
					<div
						ref={storyItemSizeRef}
						className='home-stories-recommended-list-item-container home-stories-recommended-list-item-container-hidden'
					>
						<StoryItem story={{}} size='m' />
					</div>
					{recommendedStories.map((story, index) => (
						<div key={index} className='home-stories-recommended-list-item-container'>
							<StoryItem story={story} size='m' />
						</div>
					))}
					{extraStoryItemSpaces?.map((_, index) => (
						<div
							key={index}
							className='home-stories-recommended-list-item-container home-stories-recommended-list-item-container-extra-space'
						>
							<StoryItem story={{}} size='m' />
						</div>
					))}
				</div>
			)}
		</div>
	);
};
