// Packages
import { FaLock, FaLockOpen } from "react-icons/fa";

// Components

// Logic
import { UserStoryItemLogic } from "./UserStoryItemLogic";

// Context

// Services

// Styles
import "./UserStoryItem.css";

// Assets

export const UserStoryItem = ({ storyID }) => {
	const { story, navigateToStory, navigateToOwner, onStoryItemMouseDown } = UserStoryItemLogic({ storyID });

	return (
		<div className='user-stories-story-item' onClick={navigateToStory} onAuxClick={navigateToStory} onMouseDown={onStoryItemMouseDown}>
			<div className='user-stories-story-item-spine'></div>
			<div className='user-stories-story-item-content'>
				<div className='user-stories-story-item-title'>{story?.data?.title}</div>
				<div
					className='user-stories-story-item-owner'
					onClick={navigateToOwner}
					onAuxClick={navigateToOwner}
					onMouseDown={(e) => e.preventDefault()}
				>
					{story?.data?.owner?.nickname}
					<div className='user-stories-story-item-owner-label'>
						<div className='user-stories-story-item-owner-label-username'>@{story?.data?.owner?.username}</div>
					</div>
				</div>
				<div className='user-stories-story-item-private'>{story?.isPrivate ? <FaLock /> : <FaLockOpen />}</div>
			</div>
			<div className='user-stories-story-item-pages'>
				<div className='user-stories-story-item-page'></div>
				<div className='user-stories-story-item-page'></div>
				<div className='user-stories-story-item-page'></div>
			</div>
		</div>
	);
};
