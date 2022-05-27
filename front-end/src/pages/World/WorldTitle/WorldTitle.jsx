// Packages

// Components

// Logic
import { WorldTitleLogic } from "./WorldTitleLogic";

// Context

// Services

// Styles
import "./WorldTitle.css";

// Assets

export const WorldTitle = () => {
	const { story, storyIcon } = WorldTitleLogic();

	return (
		<div className='world-title'>
			<div className='world-title-story-icon'>{!storyIcon ? null : <img src={storyIcon} alt='' />}</div>
			{!story?.data?.title ? null : (
				<>
					<div className='world-title-story-title'>{story?.data?.title}</div>
					<div className='world-title-divider'>|</div>
					<div className='world-title-world-label'>World</div>
				</>
			)}
		</div>
	);
};
