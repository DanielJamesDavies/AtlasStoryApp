// Packages

// Components
import { Story } from "./Story";

// Logic

// Context
import StoryProvider from "./StoryContext";

// Services

// Styles

// Assets

export const StoryContainer = ({ story_url }) => {
	return (
		<StoryProvider story_url={story_url}>
			<Story />
		</StoryProvider>
	);
};
