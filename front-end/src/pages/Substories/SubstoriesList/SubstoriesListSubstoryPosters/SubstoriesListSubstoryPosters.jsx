// Packages

// Components
import { DragDropContainer } from "../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../components/DragDropItem/DragDropItem";
import { CarouselContainer } from "../../../../components/CarouselContainer/CarouselContainer";
import { SubstoriesListSubstoryPoster } from "./SubstoriesListSubstoryPoster/SubstoriesListSubstoryPoster";

// Logic
import { SubstoriesListSubstoryPostersLogic } from "./SubstoriesListSubstoryPostersLogic";

// Context

// Services

// Styles
import "./SubstoriesListSubstoryPosters.css";

// Assets

export const SubstoriesListSubstoryPosters = () => {
	const { story, isReorderingSubstories, changeSubstoriesOrder } = SubstoriesListSubstoryPostersLogic();

	return (
		<div className='substories-list-substories-posters-container'>
			{!story?.data?.substories ? null : (
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
