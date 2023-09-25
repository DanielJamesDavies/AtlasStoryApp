// Packages

// Components

// Logic
import { UnitPagePrimaryStoryLogic } from "./StoryLogic";

// Context

// Services

// Styles
import "./Story.css";

// Assets

export const Story = () => {
	const { story, storyIcon } = UnitPagePrimaryStoryLogic();

	return (
		<div className='unit-page-primary-story'>
			<div className='unit-page-primary-story-icon'>{!storyIcon ? null : <img src={storyIcon} alt='' />}</div>
			<div className='unit-page-primary-story-name'>{story?.data?.title}</div>
		</div>
	);
};
