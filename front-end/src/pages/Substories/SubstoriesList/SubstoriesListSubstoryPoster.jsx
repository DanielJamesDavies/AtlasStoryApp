// Packages

// Components

// Logic
import { SubstoriesListSubstoryPosterLogic } from "./SubstoriesListSubstoryPosterLogic";

// Context

// Services

// Styles
import "./SubstoriesListSubstoryPoster.css";

// Assets

export const SubstoriesListSubstoryPoster = ({ substoryID }) => {
	const { story, substory, navigateToSubstory, onSubstoryMouseDown, posterStyles } = SubstoriesListSubstoryPosterLogic({ substoryID });

	return (
		<div
			className='substories-list-substories-poster drag-drop-item-content'
			onClick={navigateToSubstory}
			onAuxClick={navigateToSubstory}
			onMouseDown={onSubstoryMouseDown}
			style={posterStyles}
		>
			<div className='substories-list-substories-poster-content'>
				{substory?.data?.isStoryTitleInTitle ? (
					<div className='substories-list-substories-poster-content-title-container substories-list-substories-poster-content-title-container-with-story-title'>
						<div className='substories-list-substories-poster-content-title-story'>{story?.data?.title}</div>
						<div className='substories-list-substories-poster-content-title-substory'>{substory?.data?.title}</div>
					</div>
				) : (
					<div className='substories-list-substories-poster-content-title-container'>
						<div className='substories-list-substories-poster-content-title-substory'>{substory?.data?.title}</div>
					</div>
				)}
			</div>
		</div>
	);
};
