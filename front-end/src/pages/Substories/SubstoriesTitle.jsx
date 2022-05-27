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
			{!story?.data?.title ? null : (
				<>
					<div className='substories-title-story-title'>{story?.data?.title}</div>
					<div className='substories-title-divider'>|</div>
					<div className='substories-title-substories-label'>Substories</div>
				</>
			)}
		</div>
	);
};
