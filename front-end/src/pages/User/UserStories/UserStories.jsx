// Packages
import { FaPlus } from "react-icons/fa";

// Components
import { UserStoryItem } from "./UserStoryItem";
import { UserCreateStory } from "./UserCreateStory";

// Logic
import { UserStoriesLogic } from "./UserStoriesLogic";

// Context

// Services

// Styles
import "./UserStories.css";

// Assets

export const UserStories = () => {
	const { stories, isAuthorizedUserProfile, openCreateStoryForm } = UserStoriesLogic();

	return (
		<div className='user-stories'>
			<div className='user-stories-top'>
				<div className='user-stories-top-title'>Stories</div>
				<div className='user-stories-top-items-count'>{!stories ? null : "(" + stories.length + ")"}</div>
				{!isAuthorizedUserProfile ? null : (
					<button className='user-stories-top-create-story-btn' onClick={openCreateStoryForm}>
						<FaPlus />
					</button>
				)}
			</div>
			<div className='user-stories-story-items-container'>
				{!stories ? null : stories.map((story, index) => <UserStoryItem key={index} story={story} />)}
			</div>
			<UserCreateStory />
		</div>
	);
};
