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
	const { recommendedStories, extraStoryItemSpaces, nc_public_uid } = RecommendedStoriesLogic();

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
				<CarouselContainer speed={0.7} buttonScroll={true}>
					<div className='home-stories-popular-list'>
						{recommendedStories
							.sort((a, b) => {
								if (a.uid === nc_public_uid) return -1;
								if (b.uid === nc_public_uid) return 1;
								return 0;
							})
							.map((story, index) => (
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
				</CarouselContainer>
			)}
		</div>
	);
};
