// Packages

// Components
import { Story } from "./Story";

// Logic

// Context
import StoryProvider from "./StoryContext";

// Services

// Styles

// Assets

export const StoryContainer = ({ story_uid }) => {
	return (
		<StoryProvider story_uid={story_uid}>
			<Story />
		</StoryProvider>
	);
};
