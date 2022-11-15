// Packages

// Components
import { StoryPrimary } from "./StoryPrimary/StoryPrimary";
import { StoryDescription } from "./StoryDescription/StoryDescription";
import { StoryGenres } from "./StoryGenres/StoryGenres";
import { StoryPrimaryCharacters } from "./StoryPrimaryCharacters/StoryPrimaryCharacters";
import { StorySettings } from "./StorySettings/StorySettings";

// Logic
import { StoryLogic } from "./StoryLogic";

// Context

// Services

// Styles
import "./Story.css";

// Assets

export const Story = () => {
	const { storyStyles } = StoryLogic();

	return (
		<div className='story' style={storyStyles}>
			<StoryPrimary />
			<div className='story-section-1'>
				<StoryGenres />
				<StoryDescription />
			</div>
			<div className='story-section-2'>
				<StoryPrimaryCharacters />
			</div>
			<StorySettings />
		</div>
	);
};
