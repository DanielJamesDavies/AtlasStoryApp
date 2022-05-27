// Packages

// Components
import { Text } from "../../../components/Text/Text";

// Logic
import { StoryDescriptionLogic } from "./StoryDescriptionLogic";

// Context

// Services

// Styles
import "./StoryDescription.css";

// Assets

export const StoryDescription = () => {
	const { story } = StoryDescriptionLogic();

	if (story?.data?.description)
		return (
			<div className='story-description'>
				<div className='story-description-title'>Description</div>
				<Text value={story.data.description} />
			</div>
		);
};
