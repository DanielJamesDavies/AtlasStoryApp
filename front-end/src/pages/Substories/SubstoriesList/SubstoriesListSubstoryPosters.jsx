// Packages

// Components
import { SubstoriesListSubstoryPoster } from "./SubstoriesListSubstoryPoster";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";

// Logic
import { SubstoriesListSubstoryPostersLogic } from "./SubstoriesListSubstoryPostersLogic";

// Context

// Services

// Styles
import "./SubstoriesListSubstoryPosters.css";

// Assets

export const SubstoriesListSubstoryPosters = () => {
	const { story, substoryPosters, scrollSubstoryPosters, isReorderingSubstories, changeSubstoriesOrder, afterOnTouchMove, afterOnTouchEnd } =
		SubstoriesListSubstoryPostersLogic();

	return (
		<div
			className='substories-list-substories-posters-container'
			onMouseEnter={() => scrollSubstoryPosters(0)}
			onMouseLeave={() => scrollSubstoryPosters(-1.75)}
		>
			{!story?.data?.substories ? null : (
				<DragDropContainer
					innerRef={substoryPosters}
					className='substories-list-substories-posters'
					inlineItems={true}
					enableDragDrop={isReorderingSubstories}
					onDropItem={changeSubstoriesOrder}
					afterOnTouchMove={afterOnTouchMove}
					afterOnTouchEnd={afterOnTouchEnd}
				>
					{story?.data?.substories.map((substoryID, index) => (
						<DragDropItem key={index} index={index} className='substories-list-substory-poster-container'>
							<SubstoriesListSubstoryPoster substoryID={substoryID} />
						</DragDropItem>
					))}
				</DragDropContainer>
			)}
			<div
				className={
					substoryPosters?.current?.scrollLeft === 0
						? "substories-list-substories-posters-scroll-left substories-list-substories-posters-scroll-hidden"
						: "substories-list-substories-posters-scroll-left"
				}
				onMouseEnter={() => scrollSubstoryPosters(-2)}
				onMouseLeave={() => scrollSubstoryPosters(0)}
				onDragEnter={() => scrollSubstoryPosters(-2)}
				onDragLeave={() => scrollSubstoryPosters(0)}
			></div>
			<div
				className='substories-list-substories-posters-scroll-right'
				onMouseEnter={() => scrollSubstoryPosters(2)}
				onMouseLeave={() => scrollSubstoryPosters(0)}
				onDragEnter={() => scrollSubstoryPosters(2)}
				onDragLeave={() => scrollSubstoryPosters(0)}
			></div>
		</div>
	);
};
