// Packages

// Components
import { StoryItem } from "../../../../components/StoryItem/StoryItem";
import { CarouselContainer } from "../../../../components/CarouselContainer/CarouselContainer";

// Logic
import { FollowingStoriesLogic } from "./FollowingStoriesLogic";

// Context

// Services

// Styles
import "./FollowingStories.css";

// Assets

export const FollowingStories = () => {
	const { followingStories } = FollowingStoriesLogic();

	if (followingStories?.length === 0) return null;
	return (
		<div className='home-stories-following-container'>
			<div className='home-stories-following-title'>Following Stories</div>
			{!followingStories ? (
				<div></div>
			) : (
				<CarouselContainer speed={1}>
					<div className='home-stories-following-list'>
						{followingStories.map((story, index) => (
							<div key={index} className='home-stories-following-list-item-container'>
								<StoryItem story={story} size='m' />
							</div>
						))}
						{followingStories.map((story, index) => (
							<div key={index} className='home-stories-following-list-item-container'>
								<StoryItem story={story} size='m' />
							</div>
						))}
						{followingStories.map((story, index) => (
							<div key={index} className='home-stories-following-list-item-container'>
								<StoryItem story={story} size='m' />
							</div>
						))}
					</div>
				</CarouselContainer>
			)}
		</div>
	);
};
