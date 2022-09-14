// Packages

// Components
import { SubstoryPrimaryTitle } from "./SubstoryPrimaryTitle/SubstoryPrimaryTitle";

// Logic
import { SubstoryPrimaryLogic } from "./SubstoryPrimaryLogic";

// Context

// Services

// Styles
import "./SubstoryPrimary.css";

// Assets

export const SubstoryPrimary = ({ substoryPrimaryTitleRef }) => {
	const { story, storyIcon, primaryStoryNameStyles } = SubstoryPrimaryLogic();

	return (
		<div className='substory-primary'>
			<div className='substory-primary-name-and-story-container'>
				<SubstoryPrimaryTitle substoryPrimaryTitleRef={substoryPrimaryTitleRef} />
				<div className='substory-primary-story'>
					<div className='substory-primary-story-icon'>{!storyIcon ? null : <img src={storyIcon} alt='' />}</div>
					<div className='substory-primary-story-name' style={primaryStoryNameStyles}>
						{story?.data?.title}
					</div>
				</div>
			</div>
		</div>
	);
};
