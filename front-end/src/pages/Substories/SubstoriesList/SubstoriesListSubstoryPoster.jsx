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
	const { story, substory, posterBackground, navigateToSubstory, onSubstoryMouseDown, posterContainerStyles } = SubstoriesListSubstoryPosterLogic(
		{ substoryID }
	);

	if (!substory) return <div className='substories-list-substories-poster-placeholder' />;
	return (
		<div
			className='substories-list-substories-poster-container drag-drop-item-content'
			onClick={navigateToSubstory}
			onAuxClick={navigateToSubstory}
			onMouseDown={onSubstoryMouseDown}
			style={posterContainerStyles}
		>
			<div className='substories-list-substories-poster'>
				<div className='substories-list-substories-poster-content'>
					{!substory?.data?.isTitleOnPoster ? null : substory?.data?.isStoryTitleInTitle ? (
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
				{!posterBackground ? null : (
					<div className='substories-list-substories-poster-background-container'>
						<img className='substories-list-substories-poster-background' src={posterBackground} alt='' />
					</div>
				)}
			</div>
			{substory?.data?.number === "" ? (
				<div className='substories-list-substories-poster-number-container-placeholder' />
			) : (
				<div className='substories-list-substories-poster-number-container'>
					<div className='substories-list-substories-poster-number'>{substory?.data?.number}</div>
					<div className='substories-list-substories-poster-number-background'>
						<img src={Shine} alt='' />
					</div>
				</div>
			)}
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
