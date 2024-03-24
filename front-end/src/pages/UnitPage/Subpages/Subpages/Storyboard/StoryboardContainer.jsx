// Packages

// Components
import { Storyboard } from "./Storyboard";

// Logic

// Context
import StoryboardProvider from "./StoryboardContext";

// Services

// Styles

// Assets

export const StoryboardContainer = () => {
	return (
		<StoryboardProvider>
			<Storyboard />
		</StoryboardProvider>
	);
};
