// Packages

// Components
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";
import { CarouselContainer } from "../../../../components/CarouselContainer/CarouselContainer";
import { FirstAddButton } from "../../../../components/FirstAddButton/FirstAddButton";
import { SubstoriesListSubstoryPoster } from "./SubstoriesListSubstoryPoster/SubstoriesListSubstoryPoster";

// Logic
import { SubstoriesListSubstoryPostersLogic } from "./SubstoriesListSubstoryPostersLogic";

// Context

// Services

// Styles
import "./SubstoriesListSubstoryPosters.css";

// Assets

export const SubstoriesListSubstoryPosters = () => {
	const { authorized_user_id, story, isReorderingSubstories, changeSubstoriesOrder, setIsDisplayingCreateSubstoryForm } =
		SubstoriesListSubstoryPostersLogic();

	return (
		<div className='substories-list-substories-posters-container'>
			{story?.data?.substories?.length === 0 &&
			story?.data?.members.findIndex((e) => e?.type !== "viewer" && e?.user_id === authorized_user_id) !== -1 ? (
				<div className='substories-list-substories-posters-add-first-container'>
					<FirstAddButton label='Create Plot' onClick={() => setIsDisplayingCreateSubstoryForm(true)} />
				</div>
			) : !story?.data?.substories ? null : (
				<CarouselContainer speed={1.25} fallback={true} scrollStartOnDataChange={story?._id} disableOnMobile={true}>
					<DragDropContainer
						className='substories-list-substories-posters'
						inlineItems={true}
						enableDragDrop={isReorderingSubstories}
						onDropItem={changeSubstoriesOrder}
					>
						{story?.data?.substories.map((substoryID, index) => (
							<DragDropItem key={index} index={index} className='substories-list-substory-poster-container'>
								<SubstoriesListSubstoryPoster substoryID={substoryID} />
							</DragDropItem>
						))}
					</DragDropContainer>
				</CarouselContainer>
			)}
		</div>
	);
};
