// Packages

// Components

// Logic
import { SubstoriesTitleLogic } from "./SubstoriesTitleLogic";

// Context

// Services

// Styles
import "./SubstoriesTitle.css";

// Assets

export const SubstoriesTitle = () => {
	const { story, storyIcon } = SubstoriesTitleLogic();

	return (
		<div className='substories-title'>
			<div className='substories-title-story-icon'>{!storyIcon ? null : <img src={storyIcon} alt='' />}</div>
			{!story?.title ? null : (
				<>
					<div className='substories-title-story-title'>{story?.title}</div>
					<div className='substories-title-divider'>|</div>
					<div className='substories-title-substories-label'>Substories</div>
				</>
			)}
		</div>
	);
};
