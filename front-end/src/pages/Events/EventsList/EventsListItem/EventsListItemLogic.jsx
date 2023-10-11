// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { EventsContext } from "../../EventsContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const EventsListItemLogic = ({ event }) => {
	const { story, eventsImages } = useContext(EventsContext);
	const { changeLocation } = useContext(RoutesContext);

	function onClick(e) {
		if (e.button === 2) return;
		e.preventDefault();
		if (story?.uid && event?.uid) changeLocation("/s/" + story.uid + "/e/" + event.uid, e.button === 1);
	}

	return { eventsImages, onClick };
};
