// Packages
import { FaLock, FaLockOpen } from "react-icons/fa";

// Components

// Logic
import { StoryItemLogic } from "./StoryItemLogic";

// Context

// Services

// Styles
import "./StoryItem.css";

// Assets

export const StoryItem = ({ story, className, size }) => {
	const { storyItemClassName, onClick, onMouseDown, onOwnerClick } = StoryItemLogic({ story, className, size });

	if (!story) return <div className={size ? "story-item-placeholder story-item-size-" + size : "story-item-placeholder"} />;
	return (
		<div tabIndex='1' className={storyItemClassName} onClick={onClick} onAuxClick={onClick} onMouseDown={onMouseDown}>
			<div className='story-item-spine'></div>
			<div className='story-item-content'>
				<div className='story-item-private'>{story?.data?.isPrivate ? <FaLock /> : <FaLockOpen />}</div>
				<div className='story-item-title'>{story?.data?.title}</div>
				<div className='story-item-owner' onClick={onOwnerClick} onAuxClick={onOwnerClick} onMouseDown={(e) => e.preventDefault()}>
					{story?.data?.owner?.nickname}
					<div className='story-item-owner-label'>
						<div className='story-item-owner-label-username'>@{story?.data?.owner?.username}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
