// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { EventsContext } from "../../EventsContext";

// Services

// Styles

// Assets

export const EventsListPrimaryLogic = () => {
	const { isAuthorizedToEdit, setIsDisplayingCreateEventForm, toggleIsReorderingEvents } = useContext(EventsContext);

	function openCreateEventForm() {
		setIsDisplayingCreateEventForm(true);
	}

	return { isAuthorizedToEdit, openCreateEventForm, toggleIsReorderingEvents };
};
