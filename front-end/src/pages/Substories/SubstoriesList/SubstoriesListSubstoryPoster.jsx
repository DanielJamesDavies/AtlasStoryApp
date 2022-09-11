// Packages

// Components

// Logic
import { SubstoriesListSubstoryPosterLogic } from "./SubstoriesListSubstoryPosterLogic";

// Context

// Services

// Styles
import "./SubstoriesListSubstoryPoster.css";

// Assets
import Shine from "../../../content/shine.svg";

export const SubstoriesListSubstoryPoster = ({ substoryID }) => {
	const { story, substory, navigateToSubstory, onSubstoryMouseDown, posterStyles } = SubstoriesListSubstoryPosterLogic({ substoryID });

	return (
		<div
			className='substories-list-substories-poster-container drag-drop-item-content'
			onClick={navigateToSubstory}
			onAuxClick={navigateToSubstory}
			onMouseDown={onSubstoryMouseDown}
			style={posterStyles}
		>
			<div className='substories-list-substories-poster'>
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
			<div className='substories-list-substories-poster-number-container'>
				<div className='substories-list-substories-poster-number'>{substory?.data?.number}</div>
				<div className='substories-list-substories-poster-number-background'>
					<img src={Shine} alt='' />
				</div>
			</div>
			<div className='substories-list-substories-poster-title-container'>
				{substory?.data?.isStoryTitleInTitle ? (
					<div className='substories-list-substories-poster-title'>
						{story?.data?.title}: {substory?.data?.title}
					</div>
				) : (
					<div className='substories-list-substories-poster-title'>{substory?.data?.title}</div>
				)}
			</div>
		</div>
	);
};
