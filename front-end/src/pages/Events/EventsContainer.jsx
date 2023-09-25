// Packages

// Components
import { Events } from "./Events";

// Logic

// Context
import EventsProvider from "./EventsContext";

// Services

// Styles

// Assets

export const EventsContainer = ({ story_uid }) => {
	return (
		<EventsProvider story_uid={story_uid}>
			<Events />
		</EventsProvider>
	);
};
