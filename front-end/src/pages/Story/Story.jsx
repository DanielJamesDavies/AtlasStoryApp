// Packages

// Components

// Logic
import { StoryPrimary } from "./StoryPrimary/StoryPrimary";
import { StoryDescription } from "./StoryDescription/StoryDescription";
import { StoryGenres } from "./StoryGenres/StoryGenres";
import { StoryPrimaryCharacters } from "./StoryPrimaryCharacters/StoryPrimaryCharacters";

// Context

// Services

// Styles
import "./Story.css";

// Assets

export const Story = () => {
	return (
		<div className='story'>
			<StoryPrimary />
			<div className='story-section-1'>
				<StoryGenres />
				<StoryDescription />
			</div>
			<div className='story-section-2'>
				<StoryPrimaryCharacters />
			</div>
		</div>
	);
};
