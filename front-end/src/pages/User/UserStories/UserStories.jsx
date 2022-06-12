// Packages
import { FaPlus, FaSort } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
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
	const { isAuthorizedToEdit, user, stories, openCreateStoryForm, isReorderingStories, toggleIsReorderingStories, changeStoriesOrder } =
		UserStoriesLogic();

	return (
		<div className='user-stories'>
			<div className='user-stories-top'>
				{!user ? null : <div className='user-stories-top-title'>Stories</div>}
				<div className='user-stories-top-items-count'>{!stories ? null : "(" + stories.length + ")"}</div>
				{!isAuthorizedToEdit ? null : (
					<div className='user-stories-top-modify-btns-container'>
						<IconBtn
							className='user-stories-top-modify-btn'
							seamless={true}
							icon={<FaPlus />}
							iconName='plus'
							onClick={openCreateStoryForm}
							label='Create Story'
						/>
						<IconBtn
							className='user-stories-top-modify-btn'
							seamless={true}
							icon={<FaSort />}
							iconName='sort'
							onClick={toggleIsReorderingStories}
							label='Reorder Stories'
						/>
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
