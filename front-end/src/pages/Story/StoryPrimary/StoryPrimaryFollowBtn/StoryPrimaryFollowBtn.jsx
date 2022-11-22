// Packages

// Components

// Logic
import { StoryPrimaryFollowBtnLogic } from "./StoryPrimaryFollowBtnLogic";

// Context

// Services

// Styles
import "./StoryPrimaryFollowBtn.css";

// Assets

export const StoryPrimaryFollowBtn = () => {
	const { isFollowingStory, story, onFollowStoryBtnClick } = StoryPrimaryFollowBtnLogic();

	if (!story) return null;
	return (
		<button
			className={isFollowingStory ? "story-primary-follow-btn story-primary-follow-btn-is-following" : "story-primary-follow-btn"}
			onClick={onFollowStoryBtnClick}
		>
			<div className='story-primary-follow-btn-text story-primary-follow-btn-text-follow'>Follow</div>
			<div className='story-primary-follow-btn-text story-primary-follow-btn-text-following'>Following</div>
			<div className='story-primary-follow-btn-text story-primary-follow-btn-text-unfollow'>Unfollow</div>
		</button>
	);
};
