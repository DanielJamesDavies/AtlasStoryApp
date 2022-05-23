// Packages

// Components
import { UserStoryItem } from "./UserStoryItem";

// Logic

// Context

// Services

// Styles
import "./UserStories.css";

// Assets

export const UserStories = () => {
	return (
		<div className='user-stories'>
			<div className='user-stories-top'>
				<div className='user-stories-top-title'>Stories</div>
				<div className='user-stories-top-items-count'>(5)</div>
			</div>
			<div className='user-stories-story-items-container'>
				<UserStoryItem />
				<UserStoryItem />
				<UserStoryItem />
				<UserStoryItem />
				<UserStoryItem />
			</div>
		</div>
	);
};
