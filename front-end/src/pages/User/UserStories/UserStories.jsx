// Packages
import { FaPlus, FaSort } from "react-icons/fa";

// Components
import { UserStoryItem } from "./UserStoryItem";
import { UserCreateStory } from "./UserCreateStory";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";

// Logic
import { UserStoriesLogic } from "./UserStoriesLogic";

// Context

// Services

// Styles
import "./UserStories.css";

// Assets

export const UserStories = () => {
	const { isAuthorizedToModify, user, stories, openCreateStoryForm, isReorderingStories, toggleIsReorderingStories, changeStoriesOrder } =
		UserStoriesLogic();

	return (
		<div className='user-stories'>
			<div className='user-stories-top'>
				<div className='user-stories-top-title'>Stories</div>
				<div className='user-stories-top-items-count'>{!stories ? null : "(" + stories.length + ")"}</div>
				{!isAuthorizedToModify ? null : (
					<div className='user-stories-top-modify-btns-container'>
						<button className='user-stories-top-modify-btn user-stories-top-modify-btn-create-story' onClick={openCreateStoryForm}>
							<FaPlus />
						</button>
						<button
							className='user-stories-top-modify-btn user-stories-top-modify-btn-reorder-stories'
							onClick={toggleIsReorderingStories}
						>
							<FaSort />
						</button>
					</div>
				)}
			</div>
			{!user?.data?.stories ? null : (
				<DragDropContainer
					className='user-stories-story-items-container'
					inlineItems={true}
					enableDragDrop={isReorderingStories}
					onDropItem={changeStoriesOrder}
				>
					{user.data.stories.map((storyID, index) => (
						<DragDropItem key={index} index={index} className='user-stories-story-item-container'>
							<UserStoryItem storyID={storyID} />
						</DragDropItem>
					))}
				</DragDropContainer>
			)}
			<UserCreateStory />
		</div>
	);
};
