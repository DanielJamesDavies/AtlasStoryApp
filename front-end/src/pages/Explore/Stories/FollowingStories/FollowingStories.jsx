// Packages
import { FaSort } from "react-icons/fa";

// Components
import { StoryItem } from "../../../../components/StoryItem/StoryItem";
import { CarouselContainer } from "../../../../components/CarouselContainer/CarouselContainer";
import { LoadingCircle } from "../../../../components/LoadingCircle/LoadingCircle";
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { FollowingStoriesLogic } from "./FollowingStoriesLogic";

// Context

// Services

// Styles
import "./FollowingStories.css";

// Assets

export const FollowingStories = () => {
	const {
		userFollowingStories,
		followingStories,
		isReorderingFollowingStories,
		toggleIsReorderingFollowingStories,
		changeFollowingStoriesOrder,
	} = FollowingStoriesLogic();

	if (followingStories?.length === 0) return null;
	return (
		<div className='home-stories-following-container'>
			<div className='home-stories-following-primary'>
				<div className='home-stories-following-title'>Following Stories</div>
				<IconBtn
					className='home-stories-following-modify-btn'
					seamless={true}
					icon={<FaSort />}
					iconName='sort'
					onClick={toggleIsReorderingFollowingStories}
				/>
			</div>
			{!followingStories ? (
				<div className='home-stories-following-loading-circle-container'>
					<LoadingCircle center={true} size='s' />
				</div>
			) : (
				<CarouselContainer speed={0.7} buttonScroll={true}>
					<DragDropContainer
						className='home-stories-following-list'
						inlineItems={true}
						enableDragDrop={isReorderingFollowingStories}
						onDropItem={changeFollowingStoriesOrder}
					>
						{userFollowingStories.map((story_id, index) => (
							<DragDropItem key={index} index={index} className='home-stories-following-list-item-container'>
								<StoryItem story={followingStories?.find((e) => e?._id === story_id)} size='m' />
							</DragDropItem>
						))}
					</DragDropContainer>
				</CarouselContainer>
			)}
		</div>
	);
};
