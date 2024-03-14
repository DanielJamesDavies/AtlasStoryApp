// Packages
import { FaPlus, FaSort } from "react-icons/fa";

// Components
import { CreateStoryForm } from "./CreateStoryForm/CreateStoryForm";
import { IconBtn } from "../../../components/IconBtn/IconBtn";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
import { StoryItem } from "../../../components/StoryItem/StoryItem";
import { FirstAddButton } from "../../../components/FirstAddButton/FirstAddButton";
import { CarouselContainer } from "../../../components/CarouselContainer/CarouselContainer";

// Logic
import { StoriesLogic } from "./StoriesLogic";

// Context

// Services

// Styles
import "./Stories.css";

// Assets

export const Stories = () => {
	const {
		isAuthorizedToEdit,
		authorized_username,
		user,
		stories,
		openCreateStoryForm,
		isReorderingStories,
		toggleIsReorderingStories,
		changeStoriesOrder,
	} = StoriesLogic();

	return (
		<div className='user-stories'>
			<div className='user-stories-top'>
				{!user ? null : <div className='user-stories-top-title'>Stories</div>}
				<div className='user-stories-top-items-count'>
					{!stories
						? !user
							? null
							: "(0)"
						: "(" +
						  user.data.stories
								.filter((e) => !stories || stories?.findIndex((e2) => e2._id === e) !== -1)
								.filter(
									(e) =>
										stories?.find((e2) => e2._id === e)?.owner === user?._id ||
										["owner", "collaborator"].includes(
											stories?.find((e2) => e2._id === e)?.data?.members?.find((e2) => e2?.user_id === user?._id)?.type
										)
								).length +
						  ")"}
				</div>
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
			{console.log(stories[1])}
			{user?.data?.stories?.length === 0 && authorized_username === user?.username ? (
				<div className='user-stories-add-first-story-container'>
					<FirstAddButton label='Create a New Story' onClick={openCreateStoryForm} />
				</div>
			) : !stories || !user?.data?.stories ? null : (
				<CarouselContainer className='user-stories-story-items-container' speed={0.7} buttonScroll={true}>
					<DragDropContainer
						className='user-stories-story-items'
						inlineItems={true}
						enableDragDrop={isReorderingStories}
						onDropItem={changeStoriesOrder}
					>
						{user.data.stories
							.filter((e) => !stories || stories?.findIndex((e2) => e2._id === e) !== -1)
							.filter(
								(e) =>
									stories?.find((e2) => e2._id === e)?.owner === user?._id ||
									["owner", "collaborator"].includes(
										stories?.find((e2) => e2._id === e)?.data?.members?.find((e2) => e2?.user_id === user?._id)?.type
									)
							)
							.map((story_id, index) => (
								<DragDropItem key={index} index={index} className='user-stories-story-item-container'>
									<StoryItem story={stories?.find((e) => e._id === story_id)} size='m' />
								</DragDropItem>
							))}
					</DragDropContainer>
				</CarouselContainer>
			)}
			<CreateStoryForm />
		</div>
	);
};
