// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { EventsContext } from "../EventsContext";
import { RoutesContext } from "../../../context/RoutesContext";

// Services

// Styles

// Assets

export const TimelineLogic = () => {
	const { story, events } = useContext(EventsContext);
	const { changeLocation } = useContext(RoutesContext);

	function onEventClick(e, event_uid) {
		if (e.button === 2) return;
		e.preventDefault();
		if (story?.uid && event_uid) changeLocation("/s/" + story.uid + "/e/" + event_uid, e.button === 1);
	}

	return { events, onEventClick };
};
