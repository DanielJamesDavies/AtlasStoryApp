// Packages

// Components

// Logic
import { UserStoryItemLogic } from "./UserStoryItemLogic";

// Context

// Services

// Styles
import "./UserStoryItem.css";

// Assets

export const UserStoryItem = () => {
	const { navigateToStory } = UserStoryItemLogic();

	return (
		<div className='user-stories-story-item' onClick={navigateToStory}>
			<div className='user-stories-story-item-spine'></div>
			<div className='user-stories-story-item-content'>
				<div className='user-stories-story-item-title'>Story Title</div>
				<div className='user-stories-story-item-owner'>Story Owner</div>
			</div>
			<div className='user-stories-story-item-pages'>
				<div className='user-stories-story-item-page'></div>
				<div className='user-stories-story-item-page'></div>
				<div className='user-stories-story-item-page'></div>
			</div>
		</div>
	);
};
