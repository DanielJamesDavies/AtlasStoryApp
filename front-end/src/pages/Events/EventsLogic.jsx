// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { EventsContext } from "./EventsContext";

// Services

// Styles

// Assets

export const EventsLogic = () => {
	const { authorized_user_id, story, events, eventsImages, setIsDisplayingCreateEventForm } = useContext(EventsContext);

	return { authorized_user_id, story, events, eventsImages, setIsDisplayingCreateEventForm };
};
